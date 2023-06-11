import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      // Specify the entry point for your application
      input: {
        main: 'src/main.jsx',
      }, // Adjust the path if needed

      // Add any explicit optimizeDeps.include patterns
      // to ensure the necessary dependencies are pre-bundled
      optimizeDeps: {
        include: ['dependency-package'], // Adjust with your dependencies
      },
    },
  },
  plugins: [
    react(),
    reactRefresh(),
  ],
  test: {
    globals: true,
    environment: 'happy-dom',
    framework: 'jest',
    include: 'src/components/**/*.test.(ts|tsx)'
  },
})
