
# vite-plugin-class-mangler

Vite plugin to minify & obfuscate CSS classes when building for production.

<img width="948" alt="Before" src="https://user-images.githubusercontent.com/20674057/172965716-fa2e62a3-1823-4abe-8a33-11b83cf0f56a.png">
<img width="948" alt="After" src="https://user-images.githubusercontent.com/20674057/172965725-f1f16f35-2611-4b6a-9d9d-851e006180ad.png">


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
      dev: true,  // Set to true to enable in dev environment
      min: 2,     // Min number of characters in the generated class names
      max: 6,     // Max number of characters in the generated class names
      length: 8  // If a length is provided, it will be used instead of min and max
    })
  ]
});
```

## Supported frameworks

- Vue (WIP)
- React (WIP)
- Svelte (WIP)
    
## Testing

To run tests, run the following command

```bash
npm run test
```

## Credits

Forked from [vite-plugin-tailwind-obfuscate](https://github.com/misbahansori/vite-plugin-tailwind-obfuscate)
