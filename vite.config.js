import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import dotenv from "dotenv";
import compression from "vite-plugin-compression"; // Importa el plugin de compresión
import legacy from "@vitejs/plugin-legacy"; // Importa el plugin legacy
import purgecss from "@fullhuman/postcss-purgecss"; // Para purgar CSS no utilizado

// Carga las variables de entorno desde el archivo .env
dotenv.config();

export default defineConfig({
  plugins: [
    vue(),
    compression({
      algorithm: "brotliCompress", // Cambiado a Brotli para mejor compresión
      ext: ".br", // Extensión Brotli
      threshold: 10240, // Tamaño mínimo de archivo para compresión (en bytes)
      deleteOriginFile: false, // No eliminar los archivos originales
      filter: /\.(js|css|html)$/i, // Archivos a comprimir
    }),
    legacy({
      targets: ["defaults", "not IE 11"], // Especifica los navegadores para los que se generará el código legacy
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"], // Polyfills adicionales
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 8080,
    logLevel: "error",
    hmr: process.env.NODE_ENV === "development",
  },
  base: "./",
  define: {
    "process.env.VUE_APP_URL_AXIOS": JSON.stringify(process.env.VUE_APP_URL_AXIOS),
    "process.env.VUE_APP_URL_APLICATIVO_INCENTIVO": JSON.stringify(process.env.VUE_APP_URL_APLICATIVO_INCENTIVO),
  },
  optimizeDeps: {
    include: ["@fortawesome/fontawesome-free"],
  },
  build: {
    terserOptions: {
      compress: {
        drop_console: true, // Elimina `console.*` en producción
      },
    },
    cssMinify: true, // Asegura que el CSS se minifique
    minify: "esbuild", // Usa esbuild para optimizar
    rollupOptions: {
      output: {
        manualChunks: {
          // Divide el código en múltiples archivos
          vendor: ["vue", "vue-router", "@fortawesome/fontawesome-free"],
        },
      },
    },
    // Configuración de PostCSS para purgar CSS no utilizado
    postcss: {
      plugins: [
        require("tailwindcss"),
        require("autoprefixer"),
        purgecss({
          content: [
            "./index.html",
            "./src/**/*.{vue,js,ts,jsx,tsx}", // Archivos a escanear para eliminar CSS no utilizado
          ],
          defaultExtractor(content) {
            const contentWithoutStyleBlocks = content.replace(/<style[^>]*>[^<]*<\/style>/gi, "");
            return contentWithoutStyleBlocks.match(/[A-Za-z0-9-_:/]+/g) || [];
          },
        }),
      ],
    },
  },
});
