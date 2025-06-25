import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';

async function createServer() {
  const app = express();
  
  // Create Vite server in middleware mode
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
    root: process.cwd(),
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), 'src'),
        '@shared': path.resolve(process.cwd(), 'shared'),
        '@assets': path.resolve(process.cwd(), 'attached_assets'),
      },
    },
  });

  // Use vite's connect instance as middleware
  app.use(vite.ssrFixStacktrace);
  app.use(vite.middlewares);

  app.listen(5000, '0.0.0.0', () => {
    console.log('Server running on http://localhost:5000');
  });
}

createServer();