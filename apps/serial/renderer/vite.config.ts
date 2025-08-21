import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path'

export default defineConfig({
  root: __dirname,
  plugins: [react()],
  build: {
    outDir: '../_dist/renderer',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '')
    }
  },
});
