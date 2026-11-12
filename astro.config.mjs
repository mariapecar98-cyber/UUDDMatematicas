import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
// GitHub Actions supplies these values; local development keeps the root URL.
const repository = process.env.GITHUB_REPOSITORY;
const [owner, name] = (repository || '').split('/');
const pages = repository ? {
  site: `https://${owner}.github.io`,
  base: name.toLowerCase() === `${owner.toLowerCase()}.github.io` ? '/' : `/${name}/`
} : {};
export default defineConfig({
  integrations: [react()], output: 'static', ...pages
});
