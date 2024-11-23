import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Ensure the build output directory is set
  },
  server: {
    port: 3000, // Optional: customize your local dev server port
  },
  resolve: {
    alias: {
      '@': '/src', // Optional: Shortcut for importing files from the `src` directory
    },
  },
  // Necessary for React Router in SPA
  base: '/', // Ensures proper routing for relative paths
});
