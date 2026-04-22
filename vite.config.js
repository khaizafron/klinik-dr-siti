import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(), {
    name: 'preload-assets',
    transformIndexHtml(html) {
      // Preload CSS
      html = html.replace(
        /<link rel="stylesheet" crossorigin href="([^"]*\/assets\/index-[^"]*\.css)">/g,
        '<link rel="preload" as="style" href="$1" onload="this.onload=null;this.rel=\'stylesheet\'">'
      )
      // Preload JS
      const jsMatch = html.match(/<script type="module" crossorigin src="([^"]*\/assets\/index-[^"]*\.js)">/)
      if (jsMatch) {
        const jsUrl = jsMatch[1]
        html = html.replace(
          /(<script type="module" crossorigin src="[^"]*\/assets\/index-[^"]*\.js"><\/script>)/,
          `<link rel="preload" href="${jsUrl}" as="script">\n    $1`
        )
      }
      return html
    }
  }],
  server: {
    port: 3000,
    host: true
  }
})
