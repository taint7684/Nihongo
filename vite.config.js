import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
// The only proxy target is this computer; no caller-controlled URL or paid API.
export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)), plugins: [react()],
  server: { host: '127.0.0.1', port: 5175, strictPort: true, proxy: {
    '/ollama': { target: 'http://127.0.0.1:11434', rewrite: p => p.replace(/^\/ollama/, '') },
  } },
  test: { include: ['src/**/*.test.{js,jsx}'] },
  build: { outDir: 'dist', emptyOutDir: true },
});
