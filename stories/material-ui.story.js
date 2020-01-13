import React from "react";
import { storiesOf } from "@storybook/react";
import {
  InputLabel,
  Input,
  List,
  ListItem,
  ListItemText,
  Typography
} from "@material-ui/core";

import useCombobox from "../src/useCombobox";

const givenOptions = [
  { key: "apple", value: "Apple" },
  { key: "orange", value: "Orange" },
  { key: "pear", value: "Pear" },
  { key: "tomato", value: "Tomato" },
  { key: "grapes", value: "Grapes" },
  { key: "banana", value: "Banana" }
];

const Example = () => {
  const { primitives, value, activeIndex, isOpen } = useCombobox({
    name: "fruit",
    optionToString: index => filteredOptions[index].value,
    onChange: (value, index) => console.log(value, filteredOptions[index])
  });
  const filteredOptions = givenOptions.filter(option =>
    option.value.startsWith(value)
  );

  return (
    <div {...primitives.container}>
      <InputLabel {...primitives.label}>Fruit</InputLabel>

      <Input inputComponent="input" inputProps={primitives.input} />

      {isOpen &&
        (filteredOptions.length ? (
          <List component="div" {...primitives.listbox}>
            {filteredOptions.map((option, index) => (
              <ListItem
                button
                {...primitives.listboxOption(index)}
                key={option.key}
                selected={index === activeIndex}
              >
                <ListItemText primary={option.value} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No results</Typography>
        ))}
    </div>
  );
};

storiesOf("useCombobox", module).add("Material UI", () => <Example />);
