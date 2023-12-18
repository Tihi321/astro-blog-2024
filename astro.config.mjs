import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import solidJs from "@astrojs/solid-js";
import postcssNested from 'postcss-nested';
import postcss from 'postcss';

import { remarkReadingTime } from './plugins/remark-reading-time.mjs';


// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
  site: 'https://example.com',
  integrations: [mdx(), sitemap(), solidJs()],
  outDir: './docs',
  site: 'https://www.tihomir-selak.from.hr',
  vite: {
    plugins: [
      postcss({
        plugins: [
          postcssNested(),
          // other PostCSS plugins...
        ],
      }),
    ],
  },
});