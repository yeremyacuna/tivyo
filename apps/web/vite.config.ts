import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// Configure the build tools used by the Tivyo web application.
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    // Generate the installable PWA manifest and service worker.
    VitePWA({
      registerType: 'autoUpdate',

      // Temporary icon used until the final Tivyo branding is defined.
      includeAssets: ['tivyo-icon.svg'],

      // Define how Tivyo appears and starts when installed as a PWA.
      manifest: {
        id: '/',
        name: 'Tivyo',
        short_name: 'Tivyo',
        description:
          'Turn schedules, priorities, and personal knowledge into an actionable daily plan.',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#020617',
        theme_color: '#0f172a',
        icons: [
          {
            src: '/tivyo-icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },

      // Cache the application shell and return index.html for client-side navigation.
      workbox: {
        navigateFallback: '/index.html',
        globPatterns: ['**/*.{js,css,html,svg,ico,png,webp}'],
      },
    }),
  ],
})
