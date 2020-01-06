import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";

import useCombobox from "../useCombobox";

const givenName = "given-name";

describe("container", () => {
  const { result } = renderHook(() => useCombobox({ name: givenName }));

  it("should return the expected container", () => {
    const expectedResponse = {
      ref: { current: null },
      role: "combobox",
      "aria-expanded": false,
      "aria-haspopup": "listbox",
      "aria-owns": `${givenName}-listbox`
    };

    expect(result.current.primitives.container).toStrictEqual(expectedResponse);
  });
});

describe("label", () => {
  const { result } = renderHook(() => useCombobox({ name: givenName }));

  it("should return the expected label", () => {
    const expectedResponse = {
      ref: { current: null },
      id: `${givenName}-label`,
      htmlFor: `${givenName}-input`
    };

    expect(result.current.primitives.label).toStrictEqual(expectedResponse);
  });
});

describe("input", () => {
  const expectedResponse = {
    value: "",
    id: `${givenName}-input`,
    autoComplete: "off",
    "aria-autocomplete": "list",
    "aria-controls": `${givenName}-listbox`,
    onBlur: expect.any(Function),
    onChange: expect.any(Function),
    onKeyDown: expect.any(Function)
  };

  describe("when there is an active option", () => {
    const listboxRefChildrenMock = [{ scrollIntoView: jest.fn() }];

    jest.spyOn(React, "useRef").mockReturnValue({
      current: {
        children: listboxRefChildrenMock
      }
    });

    const { result } = renderHook(() => useCombobox({ name: givenName }));

    act(() => {
      result.current.primitives.listboxOption(0);
      result.current.primitives.input.onKeyDown({ key: "ArrowDown" });
    });

    it("should return the expected input", () => {
      expect(result.current.primitives.input).toStrictEqual({
        ...expectedResponse,
        ref: { current: { children: listboxRefChildrenMock } },
        "aria-labelledby": `${givenName}-label`,
        "aria-activedescendant": `${givenName}-option-${0}`
      });
    });
  });

  describe("when there is a label primitive", () => {
    const useRefMock = "use-ref-mock";

    jest.spyOn(React, "useRef").mockReturnValue({
      current: useRefMock
    });

    const { result } = renderHook(() => useCombobox({ name: givenName }));

    it("should return the expected input", () => {
      expect(result.current.primitives.input).toStrictEqual({
        ...expectedResponse,
        ref: { current: useRefMock },
        "aria-labelledby": `${givenName}-label`
      });
    });
  });

  describe("when there is NOT a label primitive", () => {
    jest.spyOn(React, "useRef").mockReturnValue({
      current: null
    });

    const { result } = renderHook(() => useCombobox({ name: givenName }));

    it("should return the expected input", () => {
      expect(result.current.primitives.input).toStrictEqual({
        ...expectedResponse,
        ref: { current: null }
      });
    });
  });
});

describe("listbox", () => {
  const expectedResponse = {
    id: `${givenName}-listbox`,
    role: "listbox",
    onMouseOut: expect.any(Function)
  };

  describe("when there is a label primitive", () => {
    const useRefMock = "use-ref-mock";

    jest.spyOn(React, "useRef").mockReturnValue({
      current: useRefMock
    });

    const { result } = renderHook(() => useCombobox({ name: givenName }));

    it("should return the expected listbox", () => {
      expect(result.current.primitives.listbox).toStrictEqual({
        ...expectedResponse,
        ref: { current: useRefMock },
        "aria-labelledby": `${givenName}-label`
      });
    });
  });

  describe("when there is NOT a label primitive", () => {
    jest.spyOn(React, "useRef").mockReturnValue({
      current: null
    });

    const { result } = renderHook(() => useCombobox({ name: givenName }));

    it("should return the expected listbox", () => {
      expect(result.current.primitives.listbox).toStrictEqual({
        ...expectedResponse,
        ref: { current: null }
      });
    });
  });
});

describe("listboxOption", () => {
  const { result } = renderHook(() => useCombobox({ name: givenName }));

  it("should return the expected listboxOption", () => {
    const givenIndex = 0;
    const expectedResponse = {
      id: `${givenName}-option-${givenIndex}`,
      role: "option",
      "aria-selected": false,
      onClick: expect.any(Function),
      onMouseOver: expect.any(Function)
    };

    expect(result.current.primitives.listboxOption(givenIndex)).toStrictEqual(
      expectedResponse
    );
  });
});
