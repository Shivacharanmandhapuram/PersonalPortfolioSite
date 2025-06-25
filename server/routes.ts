import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage"; // This import is present but 'storage' is not used in the provided code.
import Parser from "rss-parser";

// In-memory cache for RSS feed data
interface CacheEntry {
  data: any;
  timestamp: number;
  expiresAt: number;
}

const rssCache = new Map<string, CacheEntry>();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds

/**
 * Register all API routes for the portfolio website
 * @param app - Express application instance
 * @returns HTTP server instance
 */
export async function registerRoutes(app: Express): Promise<Server> {
  /**
   * Legacy RSS feed endpoint for Thoughts page
   * @route GET /api/substack-feed
   * @returns Array of blog posts
   */
  app.get("/api/substack-feed", async (req, res) => {
    try {
      const parser = new Parser();
      const feed = await parser.parseURL(
        "https://feeds.simplecast.com/54nAGcIl",
      );

      const posts =
        feed.items?.slice(0, 10).map((item) => ({
          title: item.title || "",
          description: item.contentSnippet || item.content || "",
          pubDate: item.pubDate || "",
          link: item.link || "",
        })) || [];

      res.json(posts);
    } catch (error) {
      console.error("RSS feed error:", error);
      res.status(500).json({ error: "Failed to fetch RSS feed" });
    }
  });

  /**
   * Main RSS feed endpoint for Playbook page with pagination support and caching
   * @route GET /api/playbook-feed
   * @query page - Page number (default: 1)
   * @query limit - Posts per page (default: 6)
   * @returns Paginated blog posts with metadata
   */
  app.get("/api/playbook-feed", async (req, res) => {
    try {
      // Parse pagination parameters with defaults
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 6;
      const offset = (page - 1) * limit;

      const feedUrl = "https://shivacharanmandhapuram.substack.com/feed";
      const cacheKey = `playbook-feed-${feedUrl}`;
      const now = Date.now();

      // Check cache first
      const cachedEntry = rssCache.get(cacheKey);
      let allPosts: any[] = [];

      if (cachedEntry && now < cachedEntry.expiresAt) {
        // Use cached data
        console.log("Using cached RSS feed data");
        allPosts = cachedEntry.data;
      } else {
        // Fetch fresh data with comprehensive error handling
        console.log("Fetching fresh RSS feed data");
        
        const parser = new Parser({
          timeout: 15000, // 15 second timeout
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; RSS-Parser)',
            'Accept': 'application/rss+xml, application/xml, text/xml'
          }
        });

        try {
          const feed = await parser.parseURL(feedUrl);
          
          if (!feed || !feed.items) {
            throw new Error("Invalid RSS feed structure");
          }

          allPosts = feed.items.map((item) => ({
            title: item.title || "Untitled Post",
            contentSnippet: 
              item.contentSnippet ||
              (item.content ? item.content.substring(0, 200) + "..." : "No content available"),
            pubDate: item.pubDate || new Date().toISOString(),
            link: item.link || "#",
          }));

          // Cache the successful result
          rssCache.set(cacheKey, {
            data: allPosts,
            timestamp: now,
            expiresAt: now + CACHE_DURATION
          });

          console.log(`Cached ${allPosts.length} posts for 10 minutes`);

        } catch (fetchError) {
          console.error("RSS fetch error:", fetchError);
          
          // Try to use stale cache if available
          if (cachedEntry) {
            console.log("Using stale cached data due to fetch error");
            allPosts = cachedEntry.data;
          } else {
            // No cache available, return empty array
            console.log("No cache available, returning empty response");
            allPosts = [];
          }
        }
      }

      // Implement pagination
      const paginatedPosts = allPosts.slice(offset, offset + limit);
      const hasMore = offset + limit < allPosts.length;

      // Set appropriate cache headers
      res.set({
        "Cache-Control": "public, max-age=300", // 5 minutes browser cache
        "Content-Type": "application/json",
      });

      const response = {
        posts: paginatedPosts,
        hasMore,
        currentPage: page,
        totalPosts: allPosts.length,
        cached: cachedEntry && now < cachedEntry.expiresAt,
        lastFetch: cachedEntry?.timestamp || now
      };

      res.status(200).json(response);

    } catch (error) {
      console.error("Critical error in playbook-feed endpoint:", error);
      
      // Return proper error response for Vercel
      res.status(500).json({
        error: "RSS feed temporarily unavailable",
        message: "Please try again in a few moments",
        posts: [],
        hasMore: false,
        currentPage: 1,
        totalPosts: 0,
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
