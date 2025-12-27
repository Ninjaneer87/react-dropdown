---
sidebar_position: 2
---

# Design Principles

AndrejGround Lab is built on a philosophy of predictable logic and developer ergonomics. We prioritize a 'low-friction' experience where the components get out of your way and let you build.

## Ergonomic by Default

Powerful tools shouldn't come with a steep learning curve. Every component is architected for clarity, ensuring that implementation feels natural whether you’re a beginner or a seasoned developer.

## Zero-Waste Architecture

Performance is a first-class citizen. Tree-shakable foundation ensures your production bundles only contain the code you actually use—keeping your apps lean and your load times fast.

## Smooth User Experience

All components are built with performance and scalability in mind. The event management is highly optimized, ensuring a smooth feel even in the most cluttered environments.

## Consistent API

AndrejGround Lab maintains a consistent API across all components. Common props and attributes across different components behave in a predictable way, allowing developers to anticipate component behavior and reduce learning curve.

## Accessibility

Accessibility is an ongoing priority for AndrejGround Lab. At the moment, all the components have a full keyboard navigation support and focus management.
Full assistive technologies support is on the way.

## Customizable

All components are built highly customizable. You can easily override any style using TailwindCSS classes (without worrying about class conflicts) or CSS modules, and thus have full control over the look and feel of your components. No class conflicts, no "!important" fights

## Component Slots & Granular Control

To avoid the limitations of monolithic components, AndrejGround Lab utilizes a `slots`. Slots are predefined entry points within a component’s internal structure that allow you to inject custom styles directly into sub-parts (e.g. `menu`, `item`, `trigger` for Dropdown component)
