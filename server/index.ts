// server/index.ts
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes.js";
// Removed: import { setupVite, serveStatic, log } from "./vite.js";
import cors from "cors";

/**
 * Portfolio Website Server
 * Express.js server with Vite integration for development
 * Handles API routes, static file serving, and request logging
 */

const app = express();

// Add CORS middleware
// For production, you might want to restrict 'origin' to your Vercel frontend URL
app.use(
  cors({
    origin: true, // Allows all origins, useful for debugging. Restrict in production.
    credentials: true, // If your frontend sends cookies/auth headers
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * Request logging middleware
 * Logs API requests with timing and response data
 */
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      console.log(logLine); // Changed from log() to console.log() since log from vite.js is removed
    }
  });

  next();
});

// Moved Vite setup to an async function that's only called in dev,
// and removed serveStatic from here.
async function setupAndStartServer() {
  // Register all your API routes
  await registerRoutes(app);

  // Error handling middleware
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err; // Re-throw to ensure Vercel catches the error
  });

  // Conditional Vite setup for development only
  if (process.env.NODE_ENV === "development") {
    // Use process.env.NODE_ENV
    const { setupVite } = await import("./vite.js"); // Dynamically import vite setup for dev
    const http = await import("http"); // Import http for creating server
    const server = http.createServer(app);
    await setupVite(app, server); // Pass both app and http server to vite setup
    const port = 5000;
    server.listen(
      {
        port,
        host: "0.0.0.0",
        reusePort: true,
      },
      () => {
        console.log(`Development server serving on port ${port}`);
      },
    );
  }
}

// Call the setup function immediately if not in a serverless environment
// For Vercel, we export 'app' directly. app.listen() is for local development.
if (process.env.NODE_ENV === "development" || !process.env.VERCEL) {
  setupAndStartServer();
}

// For Vercel production deployment, export the app directly
// Vercel will handle listening on a port internally
export default app; // <-- REQUIRED for Vercel serverless functions
