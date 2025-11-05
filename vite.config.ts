import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Replace 'YOUR_REPOSITORY_NAME' with the actual name of your GitHub repository
  base: '/dynamics-of-2d-moments/', 
})
