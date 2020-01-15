import React from "react";
import { storiesOf } from "@storybook/react";

import useCombobox from "../src/useCombobox";

const givenOptions = [
  "Austria",
  "Australia",
  "Barbados",
  "Bermuda",
  "Canada",
  "China",
  "Denmark",
  "Dominica",
  "Estonia",
  "Egypt",
  "Finland",
  "Fiji",
  "Greece",
  "Guatemala",
  "Hong Kong",
  "Hungary",
  "Ireland",
  "India",
  "Jamaica",
  "Japan",
  "Kenya",
  "Kazakhstan",
  "Lebanon",
  "Luxembourg",
  "Morocco",
  "Mongolia",
  "Nepal",
  "New Zealand",
  "Oman",
  "Poland",
  "Portugal",
  "Qatar",
  "Russia",
  "Romania",
  "Syria",
  "Sweden",
  "Thailand",
  "Turkey",
  "United Kingdom",
  "United States",
  "Vietnam",
  "Vanuatu",
  "Wallis & Futuna",
  "Western Sahara",
  "Yemen",
  "Zambia",
  "Zimbabwe"
];

const Example = () => {
  const { primitives, value, activeIndex, isOpen } = useCombobox({
    name: "country",
    optionToString: index => filteredOptions[index],
    onChange: (value, index) => console.log(value, filteredOptions[index])
  });
  const filteredOptions = givenOptions.filter(option =>
    option.startsWith(value)
  );

  return (
    <div {...primitives.container}>
      <label {...primitives.label}>Country</label>

      <input
        {...primitives.input}
        type="text"
        placeholder="e.g. United Kingdom"
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
