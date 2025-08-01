import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: __dirname,
  plugins: [react()],
  build: {
    outDir: '../_dist/renderer',
    emptyOutDir: true,
  }
});
