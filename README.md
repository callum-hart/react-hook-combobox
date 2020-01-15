# React Hook Combobox
*Turn any text field and list into a WAI-ARIA compliant combobox*

> A combobox is a widget made up of the combination of two distinct elements: 1) a single-line textbox, and 2) an associated pop-up element for helping users set the value of the textbox. – [w3.org](https://www.w3.org/TR/wai-aria-practices-1.1/#combobox)

React Hook Combobox is built to the WAI-ARIA specification for comboboxes. It follows a bring-your-own principle, which gives consumers full ownership of:

- markup: render any UI you want
- data: use any data structure you want
- filter: use any function to filter your data

This approach offers ultimate flexibility with a tiny footprint (3.8kB).

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
  const { primitives, value, activeIndex, isOpen } = useCombobox({
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
            .filter(item => item.startsWith(value))
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

The `useCombobox` hook accepts a single argument containing the fields:

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
`function(index), required`

Function that returns the display name of the selected listbox option.

### onChange
`function(value, index), required`

Function called when the selected listbox option changes.

> The `index` argument is undefined when the input primitive looses focus before a listbox option is selected. The value the user typed becomes the value of the input primitive.

### initialValue
`string, optional`

Initial value of the input primitive.

The `useCombobox` hook returns an object containing the fields:

```js
{
  primitives,
  value,
  activeIndex,
  isOpen,
  handleOpen,
  handleClear
}
```

### primitives
`object, { container, label, input, listbox, listboxOption }`

Object containing primitives used to build a combobox:

- **`container,`** `object` Top level primitive that contains or owns the other primitives.
- **`label,`** `object` Primitive used to label the combobox.
- **`input,`** `object` Primitive that serves as the textbox.
- **`listbox,`** `object` Menu primitive allowing users to choose an option.
- **`listboxOption,`** `function(index)` Primitive for a single option rendered in the menu.

### value
`string, defaults to an empty string or the value passed to initialValue`

Value of the input primitive.

### activeIndex
`number, defaults to -1`

Index of the active listbox option.

### isOpen
`boolean, defaults to false`

Reflects whether the listbox menu primitive should be visible or not.

### handleOpen
`function`

Function to programmatically set `isOpen` to true.

### handleClear
`function`

Function to clear the textbox value.

## Homage

React Hook Combobox started as a gist to explore patterns for building a) flexible and b) accessible comboboxes.

Three-quarters of the way into the implementation a friend showed me [Downshift](https://github.com/downshift-js/downshift), which achieves both a, b and more. However I couldn't stop returning to the remaining quarter and found myself finishing it!

Whilst Downshift offers way more features I still think React Hook Search is useful to those wanting:

- a simpler API (less can sometimes be more)
- a smaller bundle size ({TODO}kB vs [31.3kB](https://bundlephobia.com/result?p=downshift@3.4.7))