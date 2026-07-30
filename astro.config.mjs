// @ts-check
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://contrafaba.com',

  // The WordPress site we are replacing serves every URL with a trailing slash
  // (https://contrafaba.com/about/). Keeping 'always' + directory output means
  // each legacy URL resolves 200 with no redirect and no canonical change.
  trailingSlash: 'always',

  build: {
    format: 'directory',
  },

  integrations: [
    sitemap({
      // Pages marked noindex must not be advertised in the sitemap — listing a
      // noindex URL is a contradictory signal to crawlers.
      filter: (page) => !page.includes('/thanks/'),
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
})
