import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  plugins: [vue()],
})
