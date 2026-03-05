---
title: Why I Switched to Vite and Never Looked Back
date: 2025-07-02
tags: [tooling, vite]
excerpt: Webpack was fine until it wasn't. Vite just gets out of your way.
---

## The Dev Server Problem

Webpack's dev server works. But once your project grows, that cold start time starts eating into your focus. You hit save, you wait. It's death by a thousand cuts.

Vite starts instantly. Like, actually instant. It serves your source files directly over native ES modules — no bundling during dev at all.

## HMR That Actually Works

Hot module replacement in Webpack always felt fragile. In Vite it just works, and it's fast enough that it doesn't break your flow.

## Build Time

Vite uses Rollup under the hood for production builds. Smaller output, faster builds, and you barely have to configure anything.

## The Takeaway

If you're starting a new project today, there's no reason to reach for Webpack. Vite handles React, TypeScript, environment variables, and path aliases out of the box.