import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      process: 'process/browser', // Shim process for browser compatibility
    },
  },
  define: {
    'process.env': {}, // Avoid accessing undefined process.env
  },
});
