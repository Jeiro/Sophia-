import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tagger from "@dhiwise/component-tagger";

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        outDir: "build",
        chunkSizeWarningLimit: 2000,
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor': ['react', 'react-dom', 'react-router-dom'],
                    'charts': ['recharts', 'd3'],
                    'ui': ['framer-motion', '@radix-ui/react-slot', 'lucide-react'],
                }
            }
        },
        sourcemap: false,
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            }
        }
    },
    plugins: [tsconfigPaths(), react(), tagger()],
    server: {
        port: "4028",
        host: "0.0.0.0",
        strictPort: true,
        allowedHosts: ['.amazonaws.com', '.builtwithrocket.new']
    }
});