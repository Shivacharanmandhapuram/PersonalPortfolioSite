import type { Express } from "express";
import RSSParser from 'rss-parser';

// Simple in-memory cache
interface CacheEntry {
  data: any;
  timestamp: number;
  expiresAt: number;
}

const cache = new Map<string, CacheEntry>();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes
const parser = new RSSParser();

export async function registerRoutes(app: Express) {
  /**
   * Legacy RSS feed endpoint for Thoughts page
   * @route GET /api/substack-feed
   * @returns Array of blog posts
   */
  app.get("/api/substack-feed", async (req, res) => {
    try {
      const cacheKey = 'substack-feed';
      const cached = cache.get(cacheKey);
      
      if (cached && Date.now() < cached.expiresAt) {
        console.log('Serving cached Substack feed');
        return res.json(cached.data);
      }

      console.log('Fetching fresh Substack feed...');
      const feed = await parser.parseURL('https://advaitpaliwal.substack.com/feed');
      
      const posts = feed.items?.map(item => ({
        title: item.title || 'Untitled',
        contentSnippet: item.contentSnippet || item.content?.substring(0, 200) + '...' || '',
        link: item.link || '#',
        pubDate: item.pubDate || item.isoDate || new Date().toISOString()
      })) || [];

      // Cache the result
      cache.set(cacheKey, {
        data: posts,
        timestamp: Date.now(),
        expiresAt: Date.now() + CACHE_DURATION
      });

      res.json(posts);
    } catch (error) {
      console.error('Error fetching Substack feed:', error);
      
      // Return fallback content instead of error
      const fallbackPosts = [
        {
          title: "Welcome to My Thoughts",
          contentSnippet: "Exploring ideas at the intersection of technology, entrepreneurship, and human behavior. More posts coming soon!",
          link: "https://advaitpaliwal.substack.com",
          pubDate: new Date().toISOString()
        }
      ];
      
      res.json(fallbackPosts);
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
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 6;
      const cacheKey = 'playbook-full-feed';
      
      let allPosts: any[] = [];
      const cached = cache.get(cacheKey);
      
      if (cached && Date.now() < cached.expiresAt) {
        console.log('Using cached Playbook feed');
        allPosts = cached.data;
      } else {
        console.log('Fetching fresh Playbook feed...');
        const feed = await parser.parseURL('https://advaitpaliwal.substack.com/feed');
        
        allPosts = feed.items?.map(item => ({
          title: item.title || 'Untitled',
          contentSnippet: item.contentSnippet || item.content?.substring(0, 200) + '...' || '',
          link: item.link || '#',
          pubDate: item.pubDate || item.isoDate || new Date().toISOString()
        })) || [];

        // Cache all posts
        cache.set(cacheKey, {
          data: allPosts,
          timestamp: Date.now(),
          expiresAt: Date.now() + CACHE_DURATION
        });
      }

      // Calculate pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedPosts = allPosts.slice(startIndex, endIndex);
      const hasMore = endIndex < allPosts.length;

      const response = {
        posts: paginatedPosts,
        hasMore,
        currentPage: page,
        totalPosts: allPosts.length
      };

      res.json(response);
    } catch (error) {
      console.error('Error fetching Playbook feed:', error);
      
      // Return fallback content for failed RSS fetch
      const fallbackResponse = {
        posts: [
          {
            title: "The Founder's Playbook",
            contentSnippet: "Essential insights and strategies for building successful companies. Subscribe to my newsletter for regular updates on entrepreneurship and technology.",
            link: "https://advaitpaliwal.substack.com",
            pubDate: new Date().toISOString()
          }
        ],
        hasMore: false,
        currentPage: 1,
        totalPosts: 1
      };
      
      res.json(fallbackResponse);
    }
  });
}