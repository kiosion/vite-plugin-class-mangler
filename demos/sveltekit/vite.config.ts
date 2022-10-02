import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import Inspect from 'vite-plugin-inspect';
import ClassMangler from 'vite-plugin-class-mangler';

const config: UserConfig = {
  plugins: [
    sveltekit(),
    ClassMangler({
      dev: true,
      length: 4
    }),
    Inspect()
  ]
};

export default config;
