import { spawn } from 'child_process';

console.log('Starting Vite development server on port 5000...');

const viteProcess = spawn('npx', ['vite', '--host', '0.0.0.0', '--port', '5000'], {
  stdio: 'inherit',
  cwd: process.cwd(),
  env: { ...process.env, FORCE_COLOR: '1' }
});

viteProcess.on('close', (code) => {
  console.log(`Vite process exited with code ${code}`);
  process.exit(code || 0);
});

viteProcess.on('error', (error) => {
  console.error('Failed to start Vite:', error);
  process.exit(1);
});

process.on('SIGTERM', () => viteProcess.kill('SIGTERM'));
process.on('SIGINT', () => viteProcess.kill('SIGINT'));