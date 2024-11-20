import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:4000',
      '/rhymingApi': {
        target: 'https://rhymebrain.com',
        changeOrigin: true, // Ensures the origin of the request is changed to the target
        rewrite: (path) => path.replace(/^\/rhymingApi/, ''), // Removes '/api' prefix from the request
      },
    },
  },
});
