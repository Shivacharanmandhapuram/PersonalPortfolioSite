// Vercel serverless function for playbook RSS feed
const Parser = require('rss-parser');

// In-memory cache for RSS feed data
const rssCache = new Map();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    // Parse pagination parameters with defaults
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const offset = (page - 1) * limit;

    const feedUrl = "https://shivacharanmandhapuram.substack.com/feed";
    const cacheKey = `playbook-feed-${feedUrl}`;
    const now = Date.now();

    // Check cache first
    const cachedEntry = rssCache.get(cacheKey);
    let allPosts = [];

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
    res.setHeader('Cache-Control', 'public, max-age=300'); // 5 minutes browser cache
    res.setHeader('Content-Type', 'application/json');

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
}