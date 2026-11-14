import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html',
      precompress: false,
    }),
    env: {
      dir: './',
      publicPrefix: 'PUBLIC_',
    },
    alias: {
      $lib: './src/lib',
      $components: './src/lib/components',
      $stores: './src/lib/stores',
      $types: './src/types',
    },
    paths: {
      base: process.env.VITE_BASE_PATH || (process.argv.includes('dev') ? '' : '/Learn-Together'),
    },
    appDir: 'internal',
  },
};

export default config;
