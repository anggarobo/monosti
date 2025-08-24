import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  root: __dirname,
  plugins: [
    react(), 
    tailwindcss()
  ],
  build: {
    outDir: '../_dist/renderer',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '')
    }
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    }
  }
});
