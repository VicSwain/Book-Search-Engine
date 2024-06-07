import { defineConfig,  } from 'vite'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
export default defineConfig (({mode}) => {
  return {
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/graphql': {
        target:  "https://vic-swain-book-search-engine.onrender.com",
        secure: false,
        changeOrigin: true
      }
    }
  }
}})
