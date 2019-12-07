import React from "react";
import { storiesOf } from "@storybook/react";

import useCombobox from "../src/useCombobox";

const givenOptions = [
  { id: "1", firstName: "Emma" },
  { id: "2", firstName: "Olivia" },
  { id: "3", firstName: "Ava" },
  { id: "4", firstName: "Liam" },
  { id: "5", firstName: "Noah" },
  { id: "6", firstName: "William" }
];

const Example = () => {
  const { primitives, activeIndex, isOpen } = useCombobox({
    name: "recent-contacts",
    optionToString: index => givenOptions[index].firstName,
    onChange: (value, index) => console.log(value, givenOptions[index])
  });

  return (
    <div {...primitives.container}>
      <label {...primitives.label}>Contact</label>

      <input type="text" {...primitives.input} />

      {isOpen && (
        <>
          <p>Recently contacted:</p>
          <ul {...primitives.listbox}>
            {givenOptions.map((option, index) => (
              <li
                {...primitives.listboxOption(index)}
                key={option.id}
                style={index === activeIndex ? { background: "#D8E2EB" } : {}}
              >
                {option.firstName}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

storiesOf("useCombobox", module).add("No autocomplete", () => <Example />);
