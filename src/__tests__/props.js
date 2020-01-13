import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";

import useCombobox from "../useCombobox";

const givenName = "given-name";

describe("initialValue", () => {
  const givenInitialValue = "given-initial-value";
  const { result } = renderHook(() =>
    useCombobox({ name: givenName, initialValue: givenInitialValue })
  );

  it("should should set value to the initialValue", () => {
    expect(result.current.value).toStrictEqual(givenInitialValue);
  });
});

describe("handleOpen", () => {
  const focusMock = jest.fn();
  jest
    .spyOn(React, "useRef")
    .mockReturnValue({ current: { focus: focusMock } });
  const { result } = renderHook(() => useCombobox({ name: givenName }));

  describe("when called", () => {
    act(() => result.current.handleOpen());

    it("should set isOpen to true", () => {
      expect(result.current.isOpen).toBe(true);
    });

    it("should focus the input", () => {
      expect(focusMock).toHaveBeenCalledWith();
    });
  });
});

describe("handleClear", () => {
  const givenInitialValue = "given-initial-value";
  const onChangeMock = jest.fn();
  const { result } = renderHook(() =>
    useCombobox({
      name: givenName,
      initialValue: givenInitialValue,
      onChange: onChangeMock
    })
  );

  describe("when called", () => {
    act(() => result.current.handleClear());

    it("should set value to an empty string", () => {
      expect(result.current.value).toStrictEqual("");
    });

    it("should call onChange with an empty string", () => {
      expect(onChangeMock).toHaveBeenCalledWith("");
    });

    it("should set isOpen to false", () => {
      expect(result.current.isOpen).toBe(false);
    });
  });
});
