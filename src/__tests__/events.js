import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";

import useCombobox from "../useCombobox";

const givenName = "given-name";

describe("primitives.input.onBlur", () => {
  const listboxRefChildrenMock = [{ scrollIntoView: jest.fn() }];

  jest.spyOn(React, "useRef").mockReturnValue({
    current: {
      children: listboxRefChildrenMock
    }
  });

  describe("when called", () => {
    describe("and there is an active option", () => {
      const onChangeMock = jest.fn();
      const { result } = renderHook(() =>
        useCombobox({ name: givenName, onChange: onChangeMock })
      );

      act(() => {
        result.current.primitives.listboxOption(0);
        result.current.primitives.input.onKeyDown({ key: "ArrowDown" });
      });

      act(() => result.current.primitives.input.onBlur());

      it("should NOT call onChange", () => {
        expect(onChangeMock).not.toHaveBeenCalled();
      });
    });

    describe("and there is NOT an active option", () => {
      const givenValue = "given-value";
      const eventMock = {
        target: {
          value: givenValue
        }
      };
      const onChangeMock = jest.fn();
      const { result } = renderHook(() =>
        useCombobox({ name: givenName, onChange: onChangeMock })
      );

      act(() => {
        result.current.primitives.listboxOption(0);
        result.current.primitives.input.onChange(eventMock);
      });

      act(() => result.current.primitives.input.onBlur());

      it("should call onChange with the value", () => {
        expect(onChangeMock).toHaveBeenCalledWith(givenValue);
      });
    });
  });
});

describe("primitives.input.onChange", () => {
  describe("when called", () => {
    describe("and value is present", () => {
      const givenValue = "given-value";
      const eventMock = {
        target: {
          value: givenValue
        }
      };
      const { result } = renderHook(() => useCombobox({ name: givenName }));

      act(() => result.current.primitives.input.onChange(eventMock));

      it("should set isOpen to true", () => {
        expect(result.current.isOpen).toBe(true);
      });
    });

    describe("and value is NOT present", () => {
      const givenValue = "";
      const eventMock = {
        target: {
          value: givenValue
        }
      };
      const { result } = renderHook(() => useCombobox({ name: givenName }));

      act(() => result.current.primitives.input.onChange(eventMock));

      it("should set isOpen to false", () => {
        expect(result.current.isOpen).toBe(false);
      });
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

  const triggerKeyDown = (result, eventMock) => {
    result.current.primitives.listboxOption(0);
    result.current.primitives.listboxOption(1);
    result.current.primitives.listboxOption(2);

    result.current.primitives.input.onKeyDown(eventMock);
  };

  describe("when called", () => {
    describe("and key is ArrowDown", () => {
      const eventMock = { key: "ArrowDown" };

      describe("on first keydown", () => {
        const { result } = renderHook(() => useCombobox({ name: givenName }));
        const expectedActiveIndex = 0;

        act(() => triggerKeyDown(result, eventMock));

        it("should set activeIndex to 0", () => {
          expect(result.current.activeIndex).toStrictEqual(expectedActiveIndex);
        });

        it("should scroll the active option into view", () => {
          expect(
            listboxRefChildrenMock[expectedActiveIndex].scrollIntoView
          ).toHaveBeenCalledWith();
        });
      });

      describe("on second keydown", () => {
        const { result } = renderHook(() => useCombobox({ name: givenName }));
        const expectedActiveIndex = 1;

        act(() => triggerKeyDown(result, eventMock));
        act(() => triggerKeyDown(result, eventMock));

        it("should set activeIndex to 1", () => {
          expect(result.current.activeIndex).toStrictEqual(expectedActiveIndex);
        });

        it("should scroll the active option into view", () => {
          expect(
            listboxRefChildrenMock[expectedActiveIndex].scrollIntoView
          ).toHaveBeenCalledWith();
        });
      });

      describe("on third keydown", () => {
        const { result } = renderHook(() => useCombobox({ name: givenName }));
        const expectedActiveIndex = 2;

        act(() => triggerKeyDown(result, eventMock));
        act(() => triggerKeyDown(result, eventMock));
        act(() => triggerKeyDown(result, eventMock));

        it("should set activeIndex to 2", () => {
          expect(result.current.activeIndex).toStrictEqual(expectedActiveIndex);
        });

        it("should scroll the active option into view", () => {
          expect(
            listboxRefChildrenMock[expectedActiveIndex].scrollIntoView
          ).toHaveBeenCalledWith();
        });
      });

      describe("on forth keydown (bottom option)", () => {
        const { result } = renderHook(() => useCombobox({ name: givenName }));
        const expectedActiveIndex = 0;

        act(() => triggerKeyDown(result, eventMock));
        act(() => triggerKeyDown(result, eventMock));
        act(() => triggerKeyDown(result, eventMock));
        act(() => triggerKeyDown(result, eventMock));

        it("should set activeIndex to 0 (back to top)", () => {
          expect(result.current.activeIndex).toStrictEqual(expectedActiveIndex);
        });

        it("should scroll the active option into view", () => {
          expect(
            listboxRefChildrenMock[expectedActiveIndex].scrollIntoView
          ).toHaveBeenCalledWith();
        });
      });
    });

    describe("and key is ArrowUp", () => {
      const eventMock = { key: "ArrowUp" };

      describe("on first keydown", () => {
        const { result } = renderHook(() => useCombobox({ name: givenName }));
        const expectedActiveIndex = 2;

        act(() => triggerKeyDown(result, eventMock));

        it("should set activeIndex to 2", () => {
          expect(result.current.activeIndex).toStrictEqual(expectedActiveIndex);
        });

        it("should scroll the active option into view", () => {
          expect(
            listboxRefChildrenMock[expectedActiveIndex].scrollIntoView
          ).toHaveBeenCalledWith();
        });
      });

      describe("on second keydown", () => {
        const { result } = renderHook(() => useCombobox({ name: givenName }));
        const expectedActiveIndex = 1;

        act(() => triggerKeyDown(result, eventMock));
        act(() => triggerKeyDown(result, eventMock));

        it("should set activeIndex to 1", () => {
          expect(result.current.activeIndex).toStrictEqual(expectedActiveIndex);
        });

        it("should scroll the active option into view", () => {
          expect(
            listboxRefChildrenMock[expectedActiveIndex].scrollIntoView
          ).toHaveBeenCalledWith();
        });
      });

      describe("on third keydown", () => {
        const { result } = renderHook(() => useCombobox({ name: givenName }));
        const expectedActiveIndex = 0;

        act(() => triggerKeyDown(result, eventMock));
        act(() => triggerKeyDown(result, eventMock));
        act(() => triggerKeyDown(result, eventMock));

        it("should set activeIndex to 0", () => {
          expect(result.current.activeIndex).toStrictEqual(expectedActiveIndex);
        });

        it("should scroll the active option into view", () => {
          expect(
            listboxRefChildrenMock[expectedActiveIndex].scrollIntoView
          ).toHaveBeenCalledWith();
        });
      });

      describe("on forth keydown (top option)", () => {
        const { result } = renderHook(() => useCombobox({ name: givenName }));
        const expectedActiveIndex = 2;

        act(() => triggerKeyDown(result, eventMock));
        act(() => triggerKeyDown(result, eventMock));
        act(() => triggerKeyDown(result, eventMock));
        act(() => triggerKeyDown(result, eventMock));

        it("should set activeIndex to 2 (back to bottom)", () => {
          expect(result.current.activeIndex).toStrictEqual(expectedActiveIndex);
        });

        it("should scroll the active option into view", () => {
          expect(
            listboxRefChildrenMock[expectedActiveIndex].scrollIntoView
          ).toHaveBeenCalledWith();
        });
      });
    });

    describe("and key is PageDown", () => {
      const eventMock = { key: "PageDown" };
      const { result } = renderHook(() => useCombobox({ name: givenName }));
      const expectedActiveIndex = 2;

      act(() => triggerKeyDown(result, eventMock));

      it("should set activeIndex to 2", () => {
        expect(result.current.activeIndex).toStrictEqual(expectedActiveIndex);
      });

      it("should scroll the active option into view", () => {
        expect(
          listboxRefChildrenMock[expectedActiveIndex].scrollIntoView
        ).toHaveBeenCalledWith();
      });
    });

    describe("and key is PageUp", () => {
      const eventMock = { key: "PageUp" };
      const { result } = renderHook(() => useCombobox({ name: givenName }));
      const expectedActiveIndex = 0;

      act(() => triggerKeyDown(result, eventMock));

      it("should set activeIndex to 0", () => {
        expect(result.current.activeIndex).toStrictEqual(expectedActiveIndex);
      });

      it("should scroll the active option into view", () => {
        expect(
          listboxRefChildrenMock[expectedActiveIndex].scrollIntoView
        ).toHaveBeenCalledWith();
      });
    });

    describe("and key is Enter", () => {
      const eventMock = { key: "Enter" };
      const givenOptions = ["First option", "Second option", "Third option"];
      const onChangeMock = jest.fn();

      afterEach(() => onChangeMock.mockReset());

      describe("and optionToString returns a string", () => {
        const { result } = renderHook(() =>
          useCombobox({
            name: givenName,
            optionToString: index => givenOptions[index],
            onChange: onChangeMock
          })
        );
        const expectedActiveIndex = 1;

        act(() => triggerKeyDown(result, { key: "ArrowDown" }));
        act(() => triggerKeyDown(result, { key: "ArrowDown" }));
        act(() => triggerKeyDown(result, eventMock));

        it("should call onChange with the active option", () => {
          expect(onChangeMock).toHaveBeenCalledWith(
            givenOptions[expectedActiveIndex],
            expectedActiveIndex
          );
        });
      });

      describe("and optionToString does NOT return a string", () => {
        const { result } = renderHook(() =>
          useCombobox({
            name: givenName,
            onChange: onChangeMock
          })
        );

        act(() => triggerKeyDown(result, { key: "ArrowDown" }));
        act(() => triggerKeyDown(result, { key: "ArrowDown" }));
        act(() => triggerKeyDown(result, eventMock));

        it("should NOT call onChange", () => {
          expect(onChangeMock).not.toHaveBeenCalled();
        });
      });
    });

    describe("and key is Tab", () => {
      const eventMock = { key: "Tab" };
      const { result } = renderHook(() => useCombobox({ name: givenName }));

      act(() => triggerKeyDown(result, eventMock));

      it("should set isOpen to false", () => {
        expect(result.current.isOpen).toBe(false);
      });
    });

    describe("and key is Escape", () => {
      const eventMock = { key: "Escape" };
      const { result } = renderHook(() => useCombobox({ name: givenName }));

      act(() => triggerKeyDown(result, eventMock));

      it("should set value to an empty string", () => {
        expect(result.current.value).toStrictEqual("");
      });

      it("should set isOpen to false", () => {
        expect(result.current.isOpen).toBe(false);
      });
    });
  });
});

describe("primatives.listbox.onMouseOut", () => {
  const listboxRefChildrenMock = [{ scrollIntoView: jest.fn() }];

  jest.spyOn(React, "useRef").mockReturnValue({
    current: {
      children: listboxRefChildrenMock
    }
  });

  describe("when called", () => {
    const { result } = renderHook(() => useCombobox({ name: givenName }));

    act(() => {
      result.current.primitives.listboxOption(0);
      result.current.primitives.input.onKeyDown({ key: "ArrowDown" });
    });

    act(() => result.current.primitives.listbox.onMouseOut());

    it("should reset activeIndex", () => {
      expect(result.current.activeIndex).toStrictEqual(-1);
    });
  });
});

describe("primatives.listboxOption.onClick", () => {
  const listboxRefChildrenMock = [
    { scrollIntoView: jest.fn() },
    { scrollIntoView: jest.fn() }
  ];

  jest.spyOn(React, "useRef").mockReturnValue({
    current: {
      children: listboxRefChildrenMock
    }
  });

  describe("when called", () => {
    const givenOptions = ["First option", "Second option"];
    const onChangeMock = jest.fn();

    afterEach(() => onChangeMock.mockReset());

    describe("and optionToString returns a string", () => {
      const { result } = renderHook(() =>
        useCombobox({
          name: givenName,
          optionToString: index => givenOptions[index],
          onChange: onChangeMock
        })
      );
      const givenActiveIndex = 1;

      act(() => {
        result.current.primitives.listboxOption(0);
        result.current.primitives.listboxOption(1);
      });

      act(() =>
        result.current.primitives.listboxOption(givenActiveIndex).onClick()
      );

      it("should call onChange with the active option", () => {
        expect(onChangeMock).toHaveBeenCalledWith(
          givenOptions[givenActiveIndex],
          givenActiveIndex
        );
      });
    });

    describe("and optionToString does NOT return a string", () => {
      const { result } = renderHook(() =>
        useCombobox({
          name: givenName,
          onChange: onChangeMock
        })
      );
      const givenActiveIndex = 1;

      act(() => {
        result.current.primitives.listboxOption(0);
        result.current.primitives.listboxOption(1);
      });

      act(() =>
        result.current.primitives.listboxOption(givenActiveIndex).onClick()
      );

      it("should NOT call onChange", () => {
        expect(onChangeMock).not.toHaveBeenCalled();
      });
    });
  });
});

describe("primatives.listboxOption.onMouseOver", () => {
  const listboxRefChildrenMock = [
    { scrollIntoView: jest.fn() },
    { scrollIntoView: jest.fn() }
  ];

  jest.spyOn(React, "useRef").mockReturnValue({
    current: {
      children: listboxRefChildrenMock
    }
  });

  describe("when called", () => {
    const { result } = renderHook(() => useCombobox({ name: givenName }));
    const expectedActiveIndex = 1;

    act(() => {
      result.current.primitives.listboxOption(0);
      result.current.primitives.listboxOption(1);
    });

    act(() =>
      result.current.primitives.listboxOption(expectedActiveIndex).onMouseOver()
    );

    it("should set activeIndex to 1", () => {
      expect(result.current.activeIndex).toStrictEqual(expectedActiveIndex);
    });
  });
});
