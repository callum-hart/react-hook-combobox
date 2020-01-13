import React from "react";
import { storiesOf } from "@storybook/react";

import useCombobox from "../src/useCombobox";

const givenOptions = [
  "London",
  "Paris",
  "New York",
  "Tokyo",
  "Barcelona",
  "Moscow",
  "Chicago",
  "Singapore",
  "Dubai",
  "San Francisco",
  "Madrid",
  "Amsterdam",
  "Los Angeles",
  "Rome",
  "Boston",
  "San Jose",
  "Toronto",
  "Washington DC",
  "Zurich",
  "Hong Kong",
  "Beijing",
  "Berlin",
  "Sydney",
  "Las Vegas",
  "Frankfurt"
];

const Example = () => {
  const { primitives, value, activeIndex, isOpen } = useCombobox({
    name: "city",
    optionToString: index => filteredOptions[index],
    onChange: (value, index) => console.log(value, filteredOptions[index])
  });
  const filteredOptions = givenOptions.filter(option =>
    option.startsWith(value)
  );

  return (
    <div {...primitives.container}>
      <label {...primitives.label}>City</label>

      <input type="text" {...primitives.input} />

      {isOpen &&
        (filteredOptions.length ? (
          <ul
            {...primitives.listbox}
            style={{ maxHeight: "200px", overflow: "auto" }}
          >
            {filteredOptions.map((option, index) => (
              <li
                {...primitives.listboxOption(index)}
                key={index}
                style={index === activeIndex ? { background: "#D8E2EB" } : {}}
              >
                {option}
              </li>
            ))}
          </ul>
        ) : (
          <p>No results</p>
        ))}
    </div>
  );
};

storiesOf("useCombobox", module).add("Default", () => <Example />);
