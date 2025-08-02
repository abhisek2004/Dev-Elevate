// Client/vite.config.ts

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // String shorthand for simple cases
      '/api': {
        // Use the port your BACKEND is running on
        target: 'http://localhost:4000', 
        changeOrigin: true,
        secure: false,
      },
    },
  },
});