---
sidebar_position: 1
---

# Introduction

Welcome to AndrejGround Lab documentation!

## What is AndrejGround Lab?

AndrejGround Lab is a specialized suite of React components and hooks engineered for developers who need **structure without the overhead**.

Rather than imposing a rigid design system, this library provides high-quality building blocks that adapt to your design requirements. It’s the "middle ground" between building from scratch and being locked into a heavy UI framework.

<hr />

## FAQ

### Why take a "Design-Agnostic" approach?

Most UI libraries come with a "look" you have to fight to change. AndrejGround Lab provides only the essential structural styles. It is designed to be a foundation, not a finished house, making it perfect for projects that already have a unique brand identity or custom CSS requirements.

### How are styles handled?

To avoid the performance pitfalls of runtime CSS-in-JS, AndrejGround Lab uses TailwindCSS and CSS Modules, generating all styles at build time. This ensures full compatibility with modern environments like Next.js (App Router) and Astro without sacrificing performance.

### How do you handle class conflicts?

AndrejGround Lab uses the industry-standard `tailwind-merge` and `clsx` to handle class conflicts and even exports the `cn` utility function for easier composition of classes.

```ts
import { cn } from '@andrejground/lab';

// Defaults are merged seamlessly with your overrides
const className = cn(
  'p-4 bg-blue-500',
  customStyles && 'p-2 bg-red-500', // 'p-2' and 'bg-red-500' win
);
```

### Is it Type-Safe?

**Yes**. AndrejGround Lab is TypeScript-first. Every component, prop, and hook is strictly typed to provide a first-class developer experience with autocomplete and compile-time safety.

### Can I use AndrejGround Lab outside of React ecosystem?

**No**. To provide the best possible developer experience, AndrejGround Lab is built exclusively for the React ecosystem. It is not compatible with Vue, Svelte, or Angular.

## What about Meta-Frameworks?

**Yes**. AndrejGround Lab is compatible with meta frameworks like Next.js or Astro.
