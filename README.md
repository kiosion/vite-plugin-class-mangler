<div align='center'>
  <h1>vite-plugin-class-mangler</h1>
  <p>Vite plugin for minifying / obfuscating classes in production builds. Compatible with Tailwind, inline, or imported styles.</p>
  <img width="948" alt="Before/after" src="https://user-images.githubusercontent.com/34040324/182059296-031701cf-da83-4b34-a232-9e9b52c97b56.png">
</div>

## Supported frameworks

- Vue (In progress)
- React (In progress)
- Svelte

## Installation

> This plugin is still a work-in-progress, I'm currently working out how to extract used classes from templates & scripts before bundling, and replace all references within style tags, css, and scss files after parsing - The 'buildEnd' hook would be good timeline-wise, but doesn't allow for modification of the code. If you're knowledgable with the Vite/Rollup plugin APIs, contributions would be appreciated!

## Usage

Add to your vite config:

```js
import { defineConfig } from 'vite';
import ClassMangler from 'vite-plugin-class-mangler';

export default defineConfig({
  plugins: [
    ClassMangler()
  ]
});
```

Optionally, customize any of the following options:

```js
ClassMangler({
  dev: true,
  min: 2,
  max: 6,
  length: 8,
  suffixes: ['.svelte', '.html']
})
```

'Dev' determines whether to apply the plugin on serve or build. It defaults to 'false', only replacing class names in production builds.

Min / max are inclusive integers used for randomizing the length of the generated classes. If 'length' is provided instead, these will be ignored.

Suffixes can be overriden, provided as an array of strings, although the defaults should work in most cases (['.svelte', '.tsx', '.jsx', '.html', '.vue']).

## Testing

Run unit tests:

```bash
yarn test
```

## Credits

Forked from [vite-plugin-tailwind-obfuscate](https://github.com/misbahansori/vite-plugin-tailwind-obfuscate)
