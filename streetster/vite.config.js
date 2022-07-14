import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require("path");

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src')
    },
  },
  plugins: [vue()],
  base: process.env.NODE_ENV === "production" 
    ? "/sites/streetster/dist/"
    : "/",
})
