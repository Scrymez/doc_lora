import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  // GitHub Pages обслуживает сайт по пути /doc_lora/
  base: mode === 'production' ? '/doc_lora/' : '/',
  plugins: [react(), tailwindcss()],
}))
