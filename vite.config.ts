import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(() => ({
  // Продакшн на своём домене loromarova.ru (Beget) — сайт в корне.
  base: '/',
  plugins: [react(), tailwindcss()],
}))
