import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: __dirname,
  plugins: [react()],
  build: {
    outDir: 'app',
    emptyOutDir: true,
  },
  define: {
    "process.env": {
      VITE_DEV_SERVER_URL: JSON.stringify(process.env.VITE_DEV_SERVER_URL),
      VITE_APP_VERSION: JSON.stringify(process.env.VITE_APP_VERSION),
    }
  }
});
