import { spawn } from 'child_process';

console.log('Starting Vite development server directly...');

const viteProcess = spawn('npx', ['vite', '--host', '0.0.0.0', '--port', '5000'], {
  stdio: 'inherit',
  cwd: process.cwd() + '/client'
});

viteProcess.on('close', (code) => {
  process.exit(code || 0);
});

viteProcess.on('error', (error) => {
  console.error('Failed to start Vite:', error);
  process.exit(1);
});

process.on('SIGTERM', () => viteProcess.kill('SIGTERM'));
process.on('SIGINT', () => viteProcess.kill('SIGINT'));