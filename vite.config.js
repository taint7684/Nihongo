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
  build: { outDir: 'dist', emptyOutDir: true, chunkSizeWarningLimit: 1000, rollupOptions: { output: { manualChunks(id){ if(id.includes('node_modules/react'))return 'vendor'; if(id.includes('/src/n4-kanji-separate-assessment'))return 'n4-kanji-assessment'; if(id.includes('/src/n4-grammar-separate-assessment'))return 'n4-grammar-assessment'; if(id.includes('/src/n4-kaiwa-separate-assessment'))return 'n4-kaiwa-assessment'; if(id.includes('/src/n4-vocab-separate-assessment'))return 'n4-vocab-assessment'; if(id.includes('/src/n4-vocabulary-batch'))return 'n4-vocab-batches'; if(id.includes('/src/n5-vocabulary-batch'))return 'n5-vocab-batches'; if(id.includes('/src/n5-context-assessment-batch'))return 'n5-context-assessment'; } } } },
});
