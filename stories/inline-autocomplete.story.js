import React from "react";
import { storiesOf } from "@storybook/react";

import useCombobox from "../src/useCombobox";

const givenOptions = [
  { id: 1, country: "Austria" },
  { id: 2, country: "Australia" },
  { id: 3, country: "Barbados" },
  { id: 4, country: "Bermuda" },
  { id: 5, country: "Canada" },
  { id: 6, country: "China" },
  { id: 7, country: "Denmark" },
  { id: 8, country: "Dominica" },
  { id: 9, country: "Estonia" },
  { id: 10, country: "Egypt" },
  { id: 11, country: "Finland" },
  { id: 12, country: "Fiji" },
  { id: 13, country: "Greece" },
  { id: 14, country: "Guatemala" },
  { id: 15, country: "Hong Kong" },
  { id: 16, country: "Hungary" },
  { id: 17, country: "Ireland" },
  { id: 18, country: "India" },
  { id: 19, country: "Jamaica" },
  { id: 20, country: "Japan" },
  { id: 21, country: "Kenya" },
  { id: 22, country: "Kazakhstan" },
  { id: 23, country: "Lebanon" },
  { id: 24, country: "Luxembourg" },
  { id: 25, country: "Morocco" },
  { id: 26, country: "Mongolia" },
  { id: 27, country: "Nepal" },
  { id: 28, country: "New Zealand" },
  { id: 29, country: "Oman" },
  { id: 30, country: "Poland" },
  { id: 31, country: "Portugal" },
  { id: 32, country: "Qatar" },
  { id: 33, country: "Russia" },
  { id: 34, country: "Romania" },
  { id: 35, country: "Syria" },
  { id: 36, country: "Sweden" },
  { id: 37, country: "Thailand" },
  { id: 38, country: "Turkey" },
  { id: 39, country: "United Kingdom" },
  { id: 40, country: "United States" },
  { id: 41, country: "Vietnam" },
  { id: 42, country: "Vanuatu" },
  { id: 43, country: "Wallis & Futuna" },
  { id: 44, country: "Western Sahara" },
  { id: 45, country: "Yemen" },
  { id: 46, country: "Zambia" },
  { id: 47, country: "Zimbabwe" }
];

const Example = () => {
  const { primitives, value, activeIndex, isOpen } = useCombobox({
    name: "country",
    optionToString: index => filteredOptions[index].country,
    onChange: (value, index) => console.log(value, filteredOptions[index])
  });
  const filteredOptions = givenOptions.filter(option =>
    option.country.startsWith(value)
  );
  const inputValue = filteredOptions[activeIndex]
    ? filteredOptions[activeIndex].country
    : primitives.input.value;

  return (
    <div {...primitives.container}>
      <label {...primitives.label}>Country</label>

      <input
        {...primitives.input}
        type="text"
        value={inputValue}
        placeholder="e.g. Portugal"
      />

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
                {option.country}
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
