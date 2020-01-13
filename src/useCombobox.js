import { useState, useEffect, useRef } from "react";

const DEFAULT_ACTIVE_INDEX = -1;
const KEY_ARROW_DOWN = "ArrowDown";
const KEY_ARROW_UP = "ArrowUp";
const KEY_PAGE_DOWN = "PageDown";
const KEY_PAGE_UP = "PageUp";
const KEY_ENTER = "Enter";
const KEY_TAB = "Tab";
const KEY_ESCAPE = "Escape";

const useCombobox = ({ name, initialValue = "", optionToString, onChange }) => {
  const [value, setValue] = useState(initialValue);
  const [activeIndex, setActiveIndex] = useState(DEFAULT_ACTIVE_INDEX);
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef(null);
  const labelRef = useRef(null);
  const inputRef = useRef(null);
  const listboxRef = useRef(null);

  const labelId = `${name}-label`;
  const inputId = `${name}-input`;
  const listboxId = `${name}-listbox`;

  const valueHasFocus =
    inputRef.current && inputRef.current === document.activeElement;

  let optionsCount = 0;

  useEffect(() => {
    if (valueHasFocus) {
      document.addEventListener("click", handleDocumentClick);

      return () => document.removeEventListener("click", handleDocumentClick);
    }
  });

  const handleArrowDown = () => {
    const newActiveIndex =
      activeIndex + 1 >= optionsCount ? 0 : activeIndex + 1;

    handleNewActiveIndex(newActiveIndex);
  };

  const handleArrowUp = () => {
    const newActiveIndex =
      activeIndex - 1 < 0 ? optionsCount - 1 : activeIndex - 1;

    handleNewActiveIndex(newActiveIndex);
  };

  const handleNewActiveIndex = newActiveIndex => {
    if (
      listboxRef.current &&
      listboxRef.current.children &&
      listboxRef.current.children[newActiveIndex]
    ) {
      listboxRef.current.children[newActiveIndex].scrollIntoView();
      setActiveIndex(newActiveIndex);
    }
  };

  const handleTab = () => {
    setActiveIndex(DEFAULT_ACTIVE_INDEX);
    setIsOpen(false);
  };

  const handleEscape = () => {
    setValue("");
    setActiveIndex(DEFAULT_ACTIVE_INDEX);
    setIsOpen(false);
  };

  const openIfClosed = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const handleKeydown = ({ key }) => {
    switch (key) {
      case KEY_ARROW_DOWN:
        openIfClosed();
        return handleArrowDown();
      case KEY_ARROW_UP:
        openIfClosed();
        return handleArrowUp();
      case KEY_PAGE_DOWN:
        return handleNewActiveIndex(optionsCount - 1);
      case KEY_PAGE_UP:
        return handleNewActiveIndex(0);
      case KEY_ENTER:
        return selectOption(activeIndex);
      case KEY_TAB:
        return handleTab();
      case KEY_ESCAPE:
        return handleEscape();
      default:
        return null;
    }
  };

  const handleDocumentClick = ({ target }) => {
    if (isOpen && !containerRef.current.contains(target)) {
      setActiveIndex(DEFAULT_ACTIVE_INDEX);
      setIsOpen(false);
    }
  };

  const selectOption = index => {
    try {
      const displayName = optionToString(index);

      if (displayName) {
        setValue(displayName);
        onChange(displayName, index);
        setIsOpen(false);
      }
    } catch (error) {
      // pressed enter without an active option
      console.log(`Could not find option at index: ${index}`);
    }
  };

  return {
    primitives: {
      container: {
        ref: containerRef,
        role: "combobox",
        "aria-haspopup": "listbox",
        "aria-owns": listboxId,
        "aria-expanded": isOpen
      },
      label: {
        ref: labelRef,
        id: labelId,
        htmlFor: inputId
      },
      input: {
        ref: inputRef,
        value,
        id: inputId,
        autoComplete: "off",
        "aria-autocomplete": "list", // try 'both' / setSelectionRange
        "aria-controls": listboxId,
        ...(isOpen &&
          activeIndex > DEFAULT_ACTIVE_INDEX && {
            "aria-activedescendant": `${name}-option-${activeIndex}`
          }),
        // only apply aria-labelledby if consumer has a label
        ...(labelRef.current && {
          "aria-labelledby": labelId
        }),
        onBlur: () => {
          /**
           * If the user does not choose a option from the listbox before
           * moving focus outside the combobox, the value that the user
           * typed, if any, becomes the value of the combobox.
           */
          if (activeIndex === DEFAULT_ACTIVE_INDEX) {
            onChange(value);
          }
        },
        onChange: ({ target: { value } }) => {
          setValue(value);
          setActiveIndex(DEFAULT_ACTIVE_INDEX);

          value ? setIsOpen(true) : setIsOpen(false);
        },
        onKeyDown: event => handleKeydown(event)
      },
      listbox: {
        ref: listboxRef,
        id: listboxId,
        role: "listbox",
        // only apply aria-labelledby if consumer has a label
        ...(labelRef.current && {
          "aria-labelledby": labelId
        }),
        onMouseOut: () => setActiveIndex(DEFAULT_ACTIVE_INDEX)
      },
      listboxOption: index => {
        optionsCount++;

        return {
          id: `${name}-option-${index}`,
          role: "option",
          "aria-selected": index === activeIndex,
          onClick: () => selectOption(index),
          onMouseOver: () => setActiveIndex(index)
        };
      }
    },
    value,
    activeIndex,
    isOpen,
    handleOpen: () => {
      setIsOpen(true);
      inputRef.current.focus();
    },
    handleClear: () => {
      setValue("");
      onChange("");
      setIsOpen(false);
    }
  };
};

export default useCombobox;
