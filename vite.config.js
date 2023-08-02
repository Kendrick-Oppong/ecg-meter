import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Expose environment variables to the browser
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
