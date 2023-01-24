# p5js + Typescript Playground

p5js online editor is cool, but I can't live without Typescript

This project is generated using `vite`. It's pretty cool

## Getting Started

```
yarn install // Install dependencies
yarn dev // Start local development
```

## Changing Artwork

This set up is pretty minimal. To change artwork, go to `src/main.ts`

```
new P5((p5: P5) => {
  // Change sketches.MovingRectangle({ p5 }) to sketches.WhateverArtYouWantToSee({ p5 })
  const sketch = new sketches.MovingRectangle({ p5 });

  // Rest of the code
});
```

## Adding Artwork

```
yarn generate
```

A sketch file will be generated and import will be auto-updated. You can then work on your sketch class
