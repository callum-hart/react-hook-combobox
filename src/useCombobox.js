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
  const [term, setTerm] = useState(initialValue);
  const [activeIndex, setActiveIndex] = useState(DEFAULT_ACTIVE_INDEX);
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef(null);
  const labelRef = useRef(null);
  const inputRef = useRef(null);
  const listboxRef = useRef(null);

  const labelId = `${name}-label`;
  const inputId = `${name}-input`;
  const listboxId = `${name}-listbox`;

  const termHasFocus =
    inputRef.current && inputRef.current === document.activeElement;

  let optionsCount = 0;

  useEffect(() => {
    if (termHasFocus) {
      document.addEventListener("keydown", handleDocumentKeydown);

      return () =>
        document.removeEventListener("keydown", handleDocumentKeydown);
    }
  });

  useEffect(() => {
    if (termHasFocus) {
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

  const handlePageDown = () => {
    handleNewActiveIndex(optionsCount - 1);
  };

  const handlePageUp = () => {
    handleNewActiveIndex(0);
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

  const handleEnter = () => selectOption(activeIndex);

  const handleTab = () => {
    inputRef.current.blur();
    setActiveIndex(DEFAULT_ACTIVE_INDEX);
    setIsOpen(false);
  };

  const handleEscape = () => {
    setTerm("");
    setActiveIndex(DEFAULT_ACTIVE_INDEX);
    setIsOpen(false);
  };

  const handleDocumentKeydown = ({ key }) => {
    if (!isOpen && (key === KEY_ARROW_DOWN || key === KEY_ARROW_UP)) {
      // user pressed esc and maintained focus
      setIsOpen(true);
    }

    switch (key) {
      case KEY_ARROW_DOWN:
        return handleArrowDown();
      case KEY_ARROW_UP:
        return handleArrowUp();
      case KEY_PAGE_DOWN:
        return handlePageDown();
      case KEY_PAGE_UP:
        return handlePageUp();
      case KEY_ENTER:
        return handleEnter();
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
      inputRef.current.blur();
      setActiveIndex(DEFAULT_ACTIVE_INDEX);
      setIsOpen(false);
    }
  };

  const selectOption = index => {
    const displayName = optionToString(index);

    if (displayName) {
      setTerm(displayName);
      onChange(displayName, index);
      setIsOpen(false);
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
        value: term,
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
        onFocus: () => setIsOpen(true),
        onBlur: () => {
          /**
           * If the user does not choose a value from the listbox before
           * moving focus outside the combobox, the value that the user
           * typed, if any, becomes the value of the combobox.
           */
          if (activeIndex === DEFAULT_ACTIVE_INDEX) {
            onChange(term);
          }
        },
        onChange: ({ target: { value } }) => {
          setTerm(value);
          setActiveIndex(DEFAULT_ACTIVE_INDEX);
        }
      },
      listbox: {
        ref: listboxRef,
        id: listboxId,
        role: "listbox",
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
    term,
    activeIndex,
    isOpen,
    handleOpen: () => setIsOpen(true),
    handleReset: () => {
      setTerm("");
      setActiveIndex(DEFAULT_ACTIVE_INDEX);
      onChange("");
    },
    // is `handleSearch` needed since adding `onBlur`?
    handleSearch: () => {
      setTerm(term);
      setActiveIndex(DEFAULT_ACTIVE_INDEX);
      onChange(term);
      setIsOpen(false);
    }
  };
};

export const Combobox = ({ children, ...otherProps }) => {
  const comboboxGoodies = useCombobox({ ...otherProps });

  return children({ ...comboboxGoodies });
};

export default useCombobox;
