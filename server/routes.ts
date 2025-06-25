import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage"; // This import is present but 'storage' is not used in the provided code.
import Parser from "rss-parser";

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
   * Main RSS feed endpoint for Playbook page with pagination support
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

      const parser = new Parser();
      // Add cache-busting timestamp to bypass RSS cache
      const feedUrl = `https://shivacharanmandhapuram.substack.com/feed?t=${Date.now()}`;
      const feed = await parser.parseURL(feedUrl);

      const allPosts =
        feed.items?.map((item) => ({
          title: item.title || "",
          contentSnippet:
            item.contentSnippet ||
            item.content?.substring(0, 200) + "..." ||
            "",
          pubDate: item.pubDate || "",
          link: item.link || "",
        })) || [];

      // Simulate pagination by slicing the posts
      const paginatedPosts = allPosts.slice(offset, offset + limit);
      const hasMore = offset + limit < allPosts.length;

      // Set cache headers to reduce caching
      res.set({
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      });

      res.json({
        posts: paginatedPosts,
        hasMore,
        currentPage: page,
        totalPosts: allPosts.length,
      });
    } catch (error) {
      console.error("Playbook RSS feed error:", error);
      // Fallback to show error but still return empty array to prevent UI crash
      res.status(200).json({
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
