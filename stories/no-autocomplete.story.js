import React from "react";
import { storiesOf } from "@storybook/react";

import useCombobox from "../src/useCombobox";

const givenOptions = [
  { id: 1, location: "Austria" },
  { id: 2, location: "Australia" },
  { id: 3, location: "Barbados" },
  { id: 4, location: "Bermuda" },
  { id: 5, location: "Canada" },
  { id: 6, location: "China" }
];

const Example = () => {
  const { primitives, activeIndex, isOpen } = useCombobox({
    name: "country",
    optionToString: index => givenOptions[index].location,
    onChange: (value, index) => console.log(value, givenOptions[index])
  });

  return (
    <div {...primitives.container}>
      <label {...primitives.label}>Country</label>

      <input {...primitives.input} type="text" placeholder="e.g. China" />

      {isOpen && (
        <>
          <p>Recent searches:</p>
          <ul {...primitives.listbox}>
            {givenOptions.map((option, index) => (
              <li
                {...primitives.listboxOption(index)}
                key={option.id}
                style={index === activeIndex ? { background: "#D8E2EB" } : {}}
              >
                {option.location}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

storiesOf("useCombobox", module).add("No Autocomplete", () => <Example />);
