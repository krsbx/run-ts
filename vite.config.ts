import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import electronConfig from './electron.config';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
      assets: path.join(__dirname, 'src/assets'),
    },
  },
  plugins: [react(), electronConfig],
  server: process.env.VSCODE_DEBUG
    ? {
        host: process.env.VITE_DEV_SERVER_HOSTNAME ?? '127.0.0.1',
        port: parseInt(process.env.VITE_DEV_SERVER_PORT ?? '7777', 10),
      }
    : undefined,
});
