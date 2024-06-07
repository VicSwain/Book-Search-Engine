import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import {__dirname} from 'path';
// https://vitejs.dev/config/
export default defineConfig (({mode}) => {
  const env = loadEnv(mode, __dirname, '')
  return {
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/graphql': {
        target: env.PORT || "localhost:3001",
        secure: false,
        changeOrigin: true
      }
    }
  }
}})
