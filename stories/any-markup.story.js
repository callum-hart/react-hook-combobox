import React from "react";
import { storiesOf } from "@storybook/react";

import useCombobox from "../src/useCombobox";

const givenOptions = [
  { id: "1", destination: "Austria", flag: "🇦🇹" },
  { id: "2", destination: "Australia", flag: "🇦🇺" },
  { id: "3", destination: "Barbados", flag: "🇧🇧" },
  { id: "4", destination: "Bermuda", flag: "🇧🇲" },
  { id: "5", destination: "Canada", flag: "🇨🇦" },
  { id: "6", destination: "China", flag: "🇨🇳" },
  { id: "7", destination: "Denmark", flag: "🇩🇰" },
  { id: "8", destination: "Dominica", flag: "🇩🇲" },
  { id: "9", destination: "Estonia", flag: "🇪🇪" },
  { id: "10", destination: "Egypt", flag: "🇪🇬" },
  { id: "11", destination: "Finland", flag: "🇫🇮" },
  { id: "12", destination: "Fiji", flag: "🇫🇯" },
  { id: "13", destination: "Greece", flag: "🇬🇷" },
  { id: "14", destination: "Guatemala", flag: "🇬🇹" },
  { id: "15", destination: "Hong Kong", flag: "🇭🇰" },
  { id: "16", destination: "Hungary", flag: "🇭🇺" },
  { id: "17", destination: "Ireland", flag: "🇮🇪" },
  { id: "18", destination: "India", flag: "🇮🇳" },
  { id: "19", destination: "Jamaica", flag: "🇯🇲" },
  { id: "20", destination: "Japan", flag: "🇯🇵" },
  { id: "21", destination: "Kenya", flag: "🇰🇪" },
  { id: "22", destination: "Kazakhstan", flag: "🇰🇿" },
  { id: "23", destination: "Lebanon", flag: "🇱🇧" },
  { id: "24", destination: "Luxembourg", flag: "🇱🇺" },
  { id: "25", destination: "Morocco", flag: "🇲🇦" },
  { id: "26", destination: "Mongolia", flag: "🇲🇳" },
  { id: "27", destination: "Nepal", flag: "🇳🇵" },
  { id: "28", destination: "New Zealand", flag: "🇳🇿" },
  { id: "29", destination: "Oman", flag: "🇴🇲" },
  { id: "30", destination: "Poland", flag: "🇵🇱" },
  { id: "31", destination: "Portugal", flag: "🇵🇹" },
  { id: "32", destination: "Qatar", flag: "🇶🇦" },
  { id: "33", destination: "Russia", flag: "🇷🇺" },
  { id: "34", destination: "Romania", flag: "🇷🇴" },
  { id: "35", destination: "Syria", flag: "🇸🇾" },
  { id: "36", destination: "Sweden", flag: "🇸🇪" },
  { id: "37", destination: "Thailand", flag: "🇹🇭" },
  { id: "38", destination: "Turkey", flag: "🇹🇷" },
  { id: "39", destination: "United Kingdom", flag: "🇬🇧" },
  { id: "40", destination: "United States", flag: "🇺🇸" },
  { id: "41", destination: "Vietnam", flag: "🇻🇳" },
  { id: "42", destination: "Vanuatu", flag: "🇻🇺" },
  { id: "43", destination: "Wallis & Futuna", flag: "🇼🇫" },
  { id: "44", destination: "Western Sahara", flag: "🇪🇭" },
  { id: "45", destination: "Yemen", flag: "🇾🇪" },
  { id: "46", destination: "Zambia", flag: "🇿🇲" },
  { id: "47", destination: "Zimbabwe", flag: "🇿🇼" }
];
const containerStyles = {
  display: "flex",
  flexDirection: "column"
};

const Example = () => {
  const {
    primitives,
    value,
    activeIndex,
    isOpen,
    handleOpen,
    handleClear
  } = useCombobox({
    name: "country",
    initialValue: "Mongolia",
    optionToString: index => filteredOptions[index].destination,
    onChange: (value, index) => console.log(value, filteredOptions[index])
  });
  const filteredOptions = givenOptions.filter(option =>
    option.destination.startsWith(value)
  );

  return (
    <div {...primitives.container} style={containerStyles}>
      <label {...primitives.label}>Country</label>

      <div>
        <input type="text" {...primitives.input} placeholder="e.g. Japan" />

        {value && (
          <button type="button" onClick={handleClear}>
            Clear
          </button>
        )}
        <button type="button" onClick={handleOpen}>
          Open
        </button>
      </div>

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
                {option.flag} {option.destination}
              </li>
            ))}
          </ul>
        ) : (
          <p>No results</p>
        ))}
    </div>
  );
};

storiesOf("useCombobox", module).add("Any Markup", () => <Example />);
