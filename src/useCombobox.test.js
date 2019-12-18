import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";

import useCombobox from "./useCombobox";

const givenName = "given-name";

describe("primitives", () => {
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

describe("initialValue", () => {
  const givenInitialValue = "given-initial-value";
  const { result } = renderHook(() =>
    useCombobox({ name: givenName, initialValue: givenInitialValue })
  );

  it("should should set term to the initialValue", () => {
    expect(result.current.term).toStrictEqual(givenInitialValue);
  });
});

describe("handleOpen", () => {
  const focusMock = jest.fn();
  jest
    .spyOn(React, "useRef")
    .mockReturnValue({ current: { focus: focusMock } });
  const { result } = renderHook(() => useCombobox({ name: givenName }));

  describe("when called", () => {
    act(() => {
      result.current.handleOpen();
    });

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
    act(() => {
      result.current.handleClear();
    });

    it("should set term to an empty string", () => {
      expect(result.current.term).toStrictEqual("");
    });

    it("should call onChange with an empty string", () => {
      expect(onChangeMock).toHaveBeenCalledWith("");
    });

    it("should set isOpen to false", () => {
      expect(result.current.isOpen).toBe(false);
    });
  });
});

describe("primitives.input.onKeyDown", () => {
  const listboxRefChildrenMock = [
    { scrollIntoView: jest.fn() },
    { scrollIntoView: jest.fn() },
    { scrollIntoView: jest.fn() }
  ];
  jest.spyOn(React, "useRef").mockReturnValue({
    current: {
      children: listboxRefChildrenMock
    }
  });

  describe("when called", () => {
    describe("and key is ArrowDown", () => {
      const eventMock = { key: "ArrowDown" };

      describe("on first keydown", () => {
        const { result } = renderHook(() => useCombobox({ name: givenName }));

        act(() => {
          result.current.primitives.listboxOption(0);
          result.current.primitives.listboxOption(1);
          result.current.primitives.listboxOption(2);

          result.current.primitives.input.onKeyDown(eventMock);
        });

        it("should set activeIndex to 0", () => {
          expect(result.current.activeIndex).toStrictEqual(0);
        });
      });

      describe("on second keydown", () => {
        const { result } = renderHook(() => useCombobox({ name: givenName }));

        act(() => {
          result.current.primitives.listboxOption(0);
          result.current.primitives.listboxOption(1);
          result.current.primitives.listboxOption(2);

          result.current.primitives.input.onKeyDown(eventMock);
        });

        act(() => {
          result.current.primitives.listboxOption(0);
          result.current.primitives.listboxOption(1);
          result.current.primitives.listboxOption(2);

          result.current.primitives.input.onKeyDown(eventMock);
        });

        it("should set activeIndex to 1", () => {
          expect(result.current.activeIndex).toStrictEqual(1);
        });
      });

      describe("on third keydown", () => {
        const { result } = renderHook(() => useCombobox({ name: givenName }));

        act(() => {
          result.current.primitives.listboxOption(0);
          result.current.primitives.listboxOption(1);
          result.current.primitives.listboxOption(2);

          result.current.primitives.input.onKeyDown(eventMock);
        });

        act(() => {
          result.current.primitives.listboxOption(0);
          result.current.primitives.listboxOption(1);
          result.current.primitives.listboxOption(2);

          result.current.primitives.input.onKeyDown(eventMock);
        });

        act(() => {
          result.current.primitives.listboxOption(0);
          result.current.primitives.listboxOption(1);
          result.current.primitives.listboxOption(2);

          result.current.primitives.input.onKeyDown(eventMock);
        });

        it("should set activeIndex to 2", () => {
          expect(result.current.activeIndex).toStrictEqual(2);
        });
      });

      describe("on forth keydown (bottom option)", () => {
        const { result } = renderHook(() => useCombobox({ name: givenName }));

        act(() => {
          result.current.primitives.listboxOption(0);
          result.current.primitives.listboxOption(1);
          result.current.primitives.listboxOption(2);

          result.current.primitives.input.onKeyDown(eventMock);
        });

        act(() => {
          result.current.primitives.listboxOption(0);
          result.current.primitives.listboxOption(1);
          result.current.primitives.listboxOption(2);

          result.current.primitives.input.onKeyDown(eventMock);
        });

        act(() => {
          result.current.primitives.listboxOption(0);
          result.current.primitives.listboxOption(1);
          result.current.primitives.listboxOption(2);

          result.current.primitives.input.onKeyDown(eventMock);
        });

        act(() => {
          result.current.primitives.listboxOption(0);
          result.current.primitives.listboxOption(1);
          result.current.primitives.listboxOption(2);

          result.current.primitives.input.onKeyDown(eventMock);
        });

        it("should set activeIndex to 0 (back to top)", () => {
          expect(result.current.activeIndex).toStrictEqual(0);
        });
      });
    });
  });
});