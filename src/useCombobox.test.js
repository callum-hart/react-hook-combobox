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
    { scrollIntoView: jest.fn() }
  ];
  const setupTest = (result, eventMock) => {
    listboxRefChildrenMock.forEach((mock, index) =>
      result.current.primitives.listboxOption(index)
    );
    result.current.primitives.input.onKeyDown(eventMock);
  };

  jest.spyOn(React, "useRef").mockReturnValue({
    current: {
      children: listboxRefChildrenMock
    }
  });

  describe("when called", () => {
    describe("and key is ArrowDown", () => {
      const { result } = renderHook(() => useCombobox({ name: givenName }));
      const eventMock = { key: "ArrowDown" };
      const expectedActiveIndex = 0;

      act(() => setupTest(result, eventMock));

      it("should set isOpen to true", () => {
        expect(result.current.isOpen).toBe(true);
      });

      it("should set expected activeIndex", () => {
        expect(result.current.activeIndex).toStrictEqual(expectedActiveIndex);
      });

      it("should call scrollIntoView", () => {
        expect(
          listboxRefChildrenMock[expectedActiveIndex].scrollIntoView
        ).toHaveBeenCalledWith();
      });
    });

    describe("and key is ArrowUp", () => {
      const { result } = renderHook(() => useCombobox({ name: givenName }));
      const eventMock = { key: "ArrowUp" };
      const expectedActiveIndex = 1;

      act(() => setupTest(result, eventMock));

      it("should set isOpen to true", () => {
        expect(result.current.isOpen).toBe(true);
      });

      it("should set expected activeIndex", () => {
        expect(result.current.activeIndex).toStrictEqual(expectedActiveIndex);
      });

      it("should call scrollIntoView", () => {
        expect(
          listboxRefChildrenMock[expectedActiveIndex].scrollIntoView
        ).toHaveBeenCalledWith();
      });
    });
  });

  describe("and key is PageDown", () => {
    const { result } = renderHook(() => useCombobox({ name: givenName }));
    const eventMock = { key: "PageDown" };
    const expectedActiveIndex = 1;

    act(() => setupTest(result, eventMock));

    it("should set expected activeIndex", () => {
      expect(result.current.activeIndex).toStrictEqual(expectedActiveIndex);
    });

    it("should call scrollIntoView", () => {
      expect(
        listboxRefChildrenMock[expectedActiveIndex].scrollIntoView
      ).toHaveBeenCalledWith();
    });
  });

  describe("and key is PageUp", () => {
    const { result } = renderHook(() => useCombobox({ name: givenName }));
    const eventMock = { key: "PageUp" };
    const expectedActiveIndex = 0;

    act(() => setupTest(result, eventMock));

    it("should set expected activeIndex", () => {
      expect(result.current.activeIndex).toStrictEqual(expectedActiveIndex);
    });

    it("should call scrollIntoView", () => {
      expect(
        listboxRefChildrenMock[expectedActiveIndex].scrollIntoView
      ).toHaveBeenCalledWith();
    });
  });
});
