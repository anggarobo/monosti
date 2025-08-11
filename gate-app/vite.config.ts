import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path, { resolve } from 'path';

export default defineConfig({
  root: path.join(__dirname, 'src/public'),
  plugins: [react()],
  build: {
    outDir: resolve(__dirname, '../../app'),
    emptyOutDir: true,

  },
  define: {
    "process.env": {
      VITE_DEV_SERVER_URL: JSON.stringify(process.env.VITE_DEV_SERVER_URL),
      VITE_APP_VERSION: JSON.stringify(process.env.VITE_APP_VERSION),
    }
  }
});
