---
title: Why I Switched From useState to useReducer
date: 2025-06-10
tags: [react, webdev]
excerpt: A short dive into when useState starts feeling messy and useReducer clicks into place.
---

## The Problem With useState at Scale

When you're building a small component, `useState` is perfect. Clean, readable, done. But the moment you have 4-5 related pieces of state that always change together — you start writing a lot of `setX`, `setY`, `setZ` calls in every handler.

That's the smell. That's when `useReducer` starts making sense.

## What Changes

Instead of scattering your state updates across handlers, you describe **what happened** — not **what changed**.

Use `dispatch({ type: "FORM_SUBMITTED" })` — the reducer handles the rest.

## The Rule of Thumb

I now reach for `useReducer` when:

- State updates depend on previous state
- Multiple sub-values update together
- You want to test state logic in isolation

Otherwise, `useState` is still king.

This isn't a "always use reducers" take. It's just recognizing the inflection point.