import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/graphql': {
        target: 'https://tmdb.sandbox.zoosh.ie',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/graphql/, '/'),
      },
    },
  },
});
