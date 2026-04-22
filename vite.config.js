import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(), {
    name: 'preload-css',
    transformIndexHtml(html) {
      // Preload CSS
      html = html.replace(
        /<link rel="stylesheet" crossorigin href="([^"]*\/assets\/index-[^"]*\.css)">/g,
        '<link rel="preload" as="style" href="$1" onload="this.onload=null;this.rel=\'stylesheet\'">'
      )
      // Add script to make CSS blocking for desktop
      html = html.replace('</head>', '<script>if (window.innerWidth >= 768) { const cssLink = document.querySelector(\'link[href*="/assets/index-"][href$=".css"]\'); if (cssLink) { cssLink.rel = \'stylesheet\'; cssLink.removeAttribute(\'onload\'); cssLink.removeAttribute(\'as\'); } }</script></head>');
      return html;
    }
  }],
  server: {
    port: 3000,
    host: true
  }
})
