import { renderHook } from "@testing-library/react-hooks";

import useCombobox from "./useCombobox";

describe("primitives", () => {
  const givenName = "given-name";
  const { result } = renderHook(() => useCombobox({ name: givenName }));
  const primitives = result.current.primitives;

  it("should return the expected container", () => {
    const expectedResponse = {
      ref: { current: null },
      role: "combobox",
      "aria-expanded": false,
      "aria-haspopup": "listbox",
      "aria-owns": `${givenName}-listbox`
    };

    expect(primitives.container).toStrictEqual(expectedResponse);
  });

  it("should return the expected label", () => {
    const expectedResponse = {
      ref: { current: null },
      id: `${givenName}-label`,
      htmlFor: `${givenName}-input`
    };

    expect(primitives.label).toStrictEqual(expectedResponse);
  });

  it("should return the expected input", () => {
    const expectedResponse = {
      ref: { current: null },
      value: "",
      id: `${givenName}-input`,
      autoComplete: "off",
      "aria-autocomplete": "list",
      "aria-controls": `${givenName}-listbox`,
      onBlur: expect.any(Function),
      onChange: expect.any(Function),
      onKeyDown: expect.any(Function)
    };

    expect(primitives.input).toStrictEqual(expectedResponse);
  });

  it("should return the expected listbox", () => {
    const expectedResponse = {
      ref: { current: null },
      id: `${givenName}-listbox`,
      role: "listbox",
      onMouseOut: expect.any(Function)
    };

    expect(primitives.listbox).toStrictEqual(expectedResponse);
  });

  it("should return the expected listboxOption", () => {
    const givenIndex = 0;
    const expectedResponse = {
      id: `${givenName}-option-${givenIndex}`,
      role: "option",
      "aria-selected": false,
      onClick: expect.any(Function),
      onMouseOver: expect.any(Function)
    };

    expect(primitives.listboxOption(givenIndex)).toStrictEqual(
      expectedResponse
    );
  });
});
