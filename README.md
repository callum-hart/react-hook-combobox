# React Hook Combobox
*Turn any text field and list into a WAI-ARIA compliant combobox*

> A combobox is a widget made up of the combination of two distinct elements: 1) a single-line textbox, and 2) an associated pop-up element for helping users set the value of the textbox. – w3.org

React Hook Combobox is built to the [WAI-ARIA specification](https://www.w3.org/TR/wai-aria-practices-1.1/#combobox) for comboboxes. It follows a bring-your-own principle, which gives consumers full ownership of:

- markup: render any UI you want
- data: use any data structure you want
- filter: use any function to filter your data

This approach combines ultimate flexibility with a tiny footprint (3.8kB).

## Quickstart

Install:

```
npm i react-hook-combobox
```

Usage:

```js
import React from "react";
import useCombobox from "react-hook-combobox";

const items = ["London", "Paris", "Rome"];

const Example = () => {
  const { primitives, term, activeIndex, isOpen } = useCombobox({
    name: "city",
    optionToString: index => items[index],
    onChange: value => console.log(value)
  });

  return (
    <div {...primitives.container}>
      <label {...primitives.label}>City</label>
      <input type="text" {...primitives.input} />

      {isOpen && (
        <ul {...primitives.listbox}>
          {items
            .filter(item => item.startsWith(term))
            .map((item, index) => (
              <li
                {...primitives.listboxOption(index)}
                key={index}
                style={index === activeIndex ? { background: "#D8E2EB" } : {}}
              >
                {item}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};
```

## API

```js
const {
  primitives, // object holding combobox primatives ({ container, label, input, listbox, listboxOption })
  term, // value of the input primative
  activeIndex, // index of the active option
  isOpen, // reflects whether the listbox primative should be visible or not
  handleOpen, // function to progromatically set isOpen to true
  handleClear // function to clear the term
} = useCombobox({
  name, // a unique (to the page) identifier
  optionToString, // function to return display value of selected option
  onChange, // function called when the selected option changes
  initialValue // optional initial value for combobox
});
```

`useCombobox` accepts one parameter containing the fields:

```js
{
  name,
  optionToString,
  onChange,
  initialValue
}
```

### name
`string, required`

A unique to the page identifier.

### optionToString
`function, required`

Function that returns the display value of the selected listbox option.

### onChange
`function, reccommended`

Function called when the selected listbox option changes.

### initialValue
`string, optional`

Initial value of the input primative.

---

`useCombobox` returns an object containing the fields:

```js
{
  primitives,
  term,
  activeIndex,
  isOpen,
  handleOpen,
  handleClear
}
```

## Homage

React Hook Combobox started as a gist to explore patterns for building a) flexible and b) accessible comboboxes.

Three-quarters of the way into the implementation a friend showed me [Downshift](https://github.com/downshift-js/downshift), which achieves both a, b and more. However I couldn't stop returning to the remaining quarter and found myself finishing it!

Whilst Downshift offers way more features I still think React Hook Search is useful to those wanting:

- a simpler API (less can sometimes be more)
- a smaller bundle size ({TODO}kB vs [31.3kB](https://bundlephobia.com/result?p=downshift@3.4.7))