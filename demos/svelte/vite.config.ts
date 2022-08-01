import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import Inspect from 'vite-plugin-inspect';
import ClassMangler from 'vite-plugin-class-mangler';

export default defineConfig({
  plugins: [
    svelte(),
    ClassMangler({
      dev: true
    }),
    Inspect()
  ]
});
