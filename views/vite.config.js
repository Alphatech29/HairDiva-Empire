import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// ✅ Using SWC instead of Babel
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {},
    },
    brotliSize: false,
  },
});
