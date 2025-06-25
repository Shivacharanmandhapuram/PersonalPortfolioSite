// Legacy RSS feed endpoint for compatibility
const Parser = require('rss-parser');

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
    const parser = new Parser();
    const feed = await parser.parseURL(
      "https://feeds.simplecast.com/54nAGcIl"
    );

    const posts = feed.items?.slice(0, 10).map((item) => ({
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
}