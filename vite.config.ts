import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  build: { chunkSizeWarningLimit: 1200 },
  base: process.env.GITHUB_PAGES ? '/tea-time/' : '/',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        // Identifiant explicite de l'appli installée. ⚠️ Chrome le résout par rapport au SITE (pas au dossier) :
        // deux adresses du même site avec le même id = « appli déjà installée ». Le changer = Chrome la voit
        // comme une NOUVELLE appli (utile si Android croit encore une ancienne installation présente).
        // Historique : (aucun) → 'english-tea-time' (adresse /English-application/) → 'english-tea-time-2' (/tea-time/).
        id: 'english-tea-time-2',
        name: 'English — Tea Time',
        short_name: 'English',
        description: "Application pour progresser en anglais : accès Jojo (B2 → C1) et Jujularage (A1 → A2)",
        theme_color: '#012169',
        background_color: '#eef2ff',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '.',
        scope: '.',
        icons: [
          { src: 'icons/icon-192-tea.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512-tea.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-maskable-512-tea.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
        // La police n'a besoin que des alphabets latins (pas de cyrillique ni de vietnamien hors ligne).
        globIgnores: ['**/*cyrillic*', '**/*vietnamese*'],
        // Rappel quotidien (notifications locales, sans serveur) : public/reminder-sw.js
        importScripts: ['reminder-sw.js'],
      },
    }),
  ],
})
