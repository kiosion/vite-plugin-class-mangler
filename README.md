<div align='center'>
  <h1>vite-plugin-class-mangler</h1>
  <p>Vite plugin for minifying / obfuscating classes in production builds. Compatible with Tailwind, inline, or imported styles.</p>
  <img width="948" alt="Before/after" src="https://user-images.githubusercontent.com/34040324/182059296-031701cf-da83-4b34-a232-9e9b52c97b56.png">
</div>

## Supported frameworks

- Vue (WIP)
- React (WIP)
- Svelte

## Installation

> **Warning**
> This plugin is still in development (and very broken)

Clone, build, then install using yarn:
```bash
yarn add -D vite-plugin-class-mangler@file:./path-to-dist/
```

## Usage

```js
import { defineConfig } from 'vite';
import classMangler from 'vite-plugin-class-mangler';

export default defineConfig({
  plugins: [
    ClassMangler({
      dev: true,  // Bool, 'true' enables plugin in non-prod environments
      min: 2,     // Int, mininum number of chars in the generated classes
      max: 6,     // Int, maximum number of chars in the generated classes
      length: 8   // Int, number of chars in the generated classes. If specified, min/max will be ignored
    })
  ]
});
```
    
## Testing

Run all unit tests:

```bash
yarn test
```

## Credits

Forked from [vite-plugin-tailwind-obfuscate](https://github.com/misbahansori/vite-plugin-tailwind-obfuscate)
