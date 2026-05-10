import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({


  plugins: [
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@components/ui": path.resolve(__dirname, "src/components/ui"),
      "@components/budget": path.resolve(__dirname, "src/components/budget"),
      "@components/dashboard": path.resolve(__dirname, "src/components/dashboard"),
      "@components/itinerary": path.resolve(__dirname, "src/components/itinerary"),
      "@components/packing": path.resolve(__dirname, "src/components/packing"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@layouts": path.resolve(__dirname, "src/layouts"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@store": path.resolve(__dirname, "src/stores"),
      "@router": path.resolve(__dirname, "src/routers"),
      "@providers": path.resolve(__dirname, "src/providers"),
      "@mock_data": path.resolve(__dirname, "src/mock_data"),
    },
  },

  server: {
    host: true,
  },
});