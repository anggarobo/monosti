import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
// import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  root: '.', // Root adalah direktori saat ini
  plugins: [
    react(),
    // viteStaticCopy({
    //   targets: [
    //     {
    //       // Menyalin semua file di folder public/ ke dalam folder public di output
    //       src: 'public/**/*',  // Wildcard untuk semua file dan folder di public/
    //       dest: 'public'       // Menyalin ke app/public/
    //     }
    //   ]
    // })
  ],
  publicDir: "public", // Disable penyalinan otomatis oleh Vite ke folder public/

  build: {
    outDir: '.dist', // Output folder
    emptyOutDir: false, // Jangan hapus file di folder output saat build
    rollupOptions: {
      input: resolve(__dirname, 'public/index.html'),
      output: {
        // Memastikan entry JS diletakkan dalam src/
        entryFileNames: 'src/[name].js', // File JS di dalam folder src/
        assetFileNames: 'public/[name][extname]', // Semua asset diletakkan di dalam folder public/
      }
    }
  },

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  define: {
    'process.env': {
      VITE_DEV_SERVER_URL: JSON.stringify(process.env.VITE_DEV_SERVER_URL),
      VITE_APP_VERSION: JSON.stringify(process.env.VITE_APP_VERSION),
    }
  }
})
