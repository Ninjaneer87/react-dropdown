---
sidebar_position: 1
---

# Introduction

Welcome to AndrejGround Lab documentation!

## What is AndrejGround Lab?

AndrejGround Lab is a collection of React components and hooks to help you build your smooth and accessible interfaces.

AndrejGround Lab's main goal is to provide a set of tools that will help you streamline the development process. There is **no design system**, the components contain only the base easily-overridable styles, and are built with accessibility in mind.

<hr />

## FAQ

### Why no design system?

The idea behind AndrejGround Lab was not to be a fully-fledged batteries-included UI framework, but rather a set of individual components to be used in any React supported environment with minimum customization effort.

### Does AndrejGround Lab use runtime CSS?

**No**, AndrejGround Lab uses TailwindCSS in combination with CSS modules for styles. All the CSS is generated at build time thus is fully compatible with the latest React and Next.js versions.

### What about TailwindCSS classes conflicts?

AndrejGround Lab uses `tailwind-merge` library to solve any TailwindCSS classes conflicts, and even exports the `cn` utility function for easier composition of classes.

```ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}

// Example usage
const baseClassNames = cn(
  'p-2',
  isSticky ? 'sticky bottom-0 z-10 bg-inherit shadow-sm' : '',
);
```

### Is TypeScript supported?

**Yes**, AndrejGround Lab is written in TypeScript and has full support for it. Every component and hook has proper type definitions.

### Can I use AndrejGround Lab outside of React ecosystem?

**No**, AndrejGround Lab is built on top of React and is not compatible with other non-React frameworks or libraries such as Svelte, Vue, or Angular.

But it is compatible with meta frameworks like Next.js or Astro.
