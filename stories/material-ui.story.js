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
  { key: "austria", value: "Austria" },
  { key: "australia", value: "Australia" },
  { key: "barbados", value: "Barbados" },
  { key: "bermuda", value: "Bermuda" },
  { key: "canada", value: "Canada" },
  { key: "china", value: "China" },
  { key: "denmark", value: "Denmark" },
  { key: "dominica", value: "Dominica" },
  { key: "estonia", value: "Estonia" },
  { key: "egypt", value: "Egypt" },
  { key: "finland", value: "Finland" },
  { key: "fiji", value: "Fiji" },
  { key: "greece", value: "Greece" },
  { key: "guatemala", value: "Guatemala" },
  { key: "hong-kong", value: "Hong Kong" },
  { key: "hungary", value: "Hungary" },
  { key: "ireland", value: "Ireland" },
  { key: "india", value: "India" },
  { key: "jamaica", value: "Jamaica" },
  { key: "japan", value: "Japan" },
  { key: "kenya", value: "Kenya" },
  { key: "kazakhstan", value: "Kazakhstan" },
  { key: "lebanon", value: "Lebanon" },
  { key: "luxembourg", value: "Luxembourg" },
  { key: "morocco", value: "Morocco" },
  { key: "mongolia", value: "Mongolia" },
  { key: "nepal", value: "Nepal" },
  { key: "new-zealand", value: "New Zealand" },
  { key: "oman", value: "Oman" },
  { key: "poland", value: "Poland" },
  { key: "portugal", value: "Portugal" },
  { key: "qatar", value: "Qatar" },
  { key: "russia", value: "Russia" },
  { key: "romania", value: "Romania" },
  { key: "syria", value: "Syria" },
  { key: "sweden", value: "Sweden" },
  { key: "thailand", value: "Thailand" },
  { key: "turkey", value: "Turkey" },
  { key: "united-kingdom", value: "United Kingdom" },
  { key: "united-states", value: "United States" },
  { key: "vietnam", value: "Vietnam" },
  { key: "vanuatu", value: "Vanuatu" },
  { key: "wallis-futuna", value: "Wallis & Futuna" },
  { key: "western-sahara", value: "Western Sahara" },
  { key: "yemen", value: "Yemen" },
  { key: "zambia", value: "Zambia" },
  { key: "zimbabwe", value: "Zimbabwe" }
];

const Example = () => {
  const { primitives, value, activeIndex, isOpen } = useCombobox({
    name: "country",
    optionToString: index => filteredOptions[index].value,
    onChange: (value, index) => console.log(value, filteredOptions[index])
  });
  const filteredOptions = givenOptions.filter(option =>
    option.value.startsWith(value)
  );

  return (
    <div {...primitives.container}>
      <InputLabel {...primitives.label}>Country</InputLabel>

      <Input
        inputProps={primitives.input}
        inputComponent="input"
        placeholder="e.g. Sweden"
      />

      {isOpen &&
        (filteredOptions.length ? (
          <List
            {...primitives.listbox}
            component="div"
            style={{ maxHeight: "200px", overflow: "auto" }}
          >
            {filteredOptions.map((option, index) => (
              <ListItem
                {...primitives.listboxOption(index)}
                button
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
