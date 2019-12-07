# React Hook Combobox
> React hook for building accessible comboboxes

A smaller, not as feature-packed, but as accessible alternative to Downshift.

React Hook Combobox is built to the [WAI-ARIA specification](https://www.w3.org/TR/wai-aria-practices-1.1/#combobox) for comboboxes. It follows a bring-your-own principle, which gives consumers full ownership of:

- markup: render any UI you want
- data: use any data structure you want
- filter: use any function to filter your data

This approach combines ultimate flexibility with a tiny footprint (3.8kB).

## Homage

React Hook Combobox started as a gist to explore patterns for building a) flexible and b) accessible comboboxes.

Three-quarters of the way into the implementation a friend showed me [Downshift](https://github.com/downshift-js/downshift), which achieves both a, b and more. However I couldn’t stop returning to the remaining quarter and found myself finishing it!

Whilst Downshift offers way more features I still think React Hook Search is useful to those wanting:

- a simpler API (less can sometimes be more)
- a smaller bundle size ({TODO}kB vs [31.3kB](https://bundlephobia.com/result?p=downshift@3.4.7))