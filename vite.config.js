import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // أثناء dev: /
  // أثناء build (GitHub Pages): /todo-roadmap/
  base: command === 'serve' ? '/' : '/todo-roadmap/',
}))
