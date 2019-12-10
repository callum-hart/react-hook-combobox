import React from "react";
import { storiesOf } from "@storybook/react";

import useCombobox from "../src/useCombobox";

const givenOptions = [
  { id: "1", title: "War and Peace", author: "Leo Tolstoy" },
  { id: "2", title: "The Great Gatsby", author: "F.Scott Fitzgerald" },
  { id: "3", title: "Hamlet", author: "William Shakespeare" }
];

const Example = () => {
  const { primitives, term, activeIndex, isOpen } = useCombobox({
    name: "book",
    optionToString: index => filteredOptions[index].title,
    onChange: (value, index) => console.log(value, filteredOptions[index])
  });
  const filteredOptions = givenOptions.filter(option =>
    option.title.startsWith(term)
  );
  const inputValue = filteredOptions[activeIndex]
    ? filteredOptions[activeIndex].title
    : primitives.input.value;

  return (
    <div {...primitives.container}>
      <label {...primitives.label}>Book</label>

      <input type="text" {...primitives.input} value={inputValue} />

      {isOpen &&
        (filteredOptions.length ? (
          <ul
            {...primitives.listbox}
            style={{ maxHeight: "200px", overflow: "auto" }}
          >
            {filteredOptions.map((option, index) => (
              <li
                {...primitives.listboxOption(index)}
                key={option.id}
                style={index === activeIndex ? { background: "#D8E2EB" } : {}}
              >
                {option.title}
              </li>
            ))}
          </ul>
        ) : (
          <p>No results</p>
        ))}
    </div>
  );
};

storiesOf("useCombobox", module).add("Inline Autocomplete", () => <Example />);
