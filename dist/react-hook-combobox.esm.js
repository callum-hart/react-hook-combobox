import { useState, useRef, useEffect } from 'react';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var DEFAULT_ACTIVE_INDEX = -1;
var KEY_ARROW_DOWN = "ArrowDown";
var KEY_ARROW_UP = "ArrowUp";
var KEY_PAGE_DOWN = "PageDown";
var KEY_PAGE_UP = "PageUp";
var KEY_ENTER = "Enter";
var KEY_TAB = "Tab";
var KEY_ESCAPE = "Escape";

var useCombobox = function useCombobox(_ref) {
  var name = _ref.name,
      _ref$initialValue = _ref.initialValue,
      initialValue = _ref$initialValue === void 0 ? "" : _ref$initialValue,
      optionToString = _ref.optionToString,
      onChange = _ref.onChange;

  var _useState = useState(initialValue),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  var _useState3 = useState(DEFAULT_ACTIVE_INDEX),
      _useState4 = _slicedToArray(_useState3, 2),
      activeIndex = _useState4[0],
      setActiveIndex = _useState4[1];

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      isOpen = _useState6[0],
      setIsOpen = _useState6[1];

  var containerRef = useRef(null);
  var labelRef = useRef(null);
  var inputRef = useRef(null);
  var listboxRef = useRef(null);
  var labelId = "".concat(name, "-label");
  var inputId = "".concat(name, "-input");
  var listboxId = "".concat(name, "-listbox");
  var valueHasFocus = inputRef.current && inputRef.current === document.activeElement;
  var optionsCount = 0;
  useEffect(function () {
    if (valueHasFocus) {
      document.addEventListener("click", handleDocumentClick);
      return function () {
        return document.removeEventListener("click", handleDocumentClick);
      };
    }
  });

  var handleArrowDown = function handleArrowDown() {
    var newActiveIndex = activeIndex + 1 >= optionsCount ? 0 : activeIndex + 1;
    handleNewActiveIndex(newActiveIndex);
  };

  var handleArrowUp = function handleArrowUp() {
    var newActiveIndex = activeIndex - 1 < 0 ? optionsCount - 1 : activeIndex - 1;
    handleNewActiveIndex(newActiveIndex);
  };

  var handleNewActiveIndex = function handleNewActiveIndex(newActiveIndex) {
    if (listboxRef.current && listboxRef.current.children && listboxRef.current.children[newActiveIndex]) {
      listboxRef.current.children[newActiveIndex].scrollIntoView();
      setActiveIndex(newActiveIndex);
    }
  };

  var handleTab = function handleTab() {
    setActiveIndex(DEFAULT_ACTIVE_INDEX);
    setIsOpen(false);
  };

  var handleEscape = function handleEscape() {
    setValue("");
    setActiveIndex(DEFAULT_ACTIVE_INDEX);
    setIsOpen(false);
  };

  var openIfClosed = function openIfClosed() {
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  var handleKeydown = function handleKeydown(_ref2) {
    var key = _ref2.key;

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

  var handleDocumentClick = function handleDocumentClick(_ref3) {
    var target = _ref3.target;

    if (isOpen && !containerRef.current.contains(target)) {
      setActiveIndex(DEFAULT_ACTIVE_INDEX);
      setIsOpen(false);
    }
  };

  var selectOption = function selectOption(index) {
    try {
      var displayName = optionToString(index);

      if (displayName) {
        setValue(displayName);
        onChange(displayName, index);
        setIsOpen(false);
      }
    } catch (error) {
      console.log("Could not find option at index: ".concat(index));
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
      input: _objectSpread2({
        ref: inputRef,
        value: value,
        id: inputId,
        autoComplete: "off",
        "aria-autocomplete": "list",
        "aria-controls": listboxId
      }, isOpen && activeIndex > DEFAULT_ACTIVE_INDEX && {
        "aria-activedescendant": "".concat(name, "-option-").concat(activeIndex)
      }, {}, labelRef.current && {
        "aria-labelledby": labelId
      }, {
        onBlur: function onBlur() {
          if (activeIndex === DEFAULT_ACTIVE_INDEX) {
            onChange(value);
          }
        },
        onChange: function onChange(_ref4) {
          var value = _ref4.target.value;
          setValue(value);
          setActiveIndex(DEFAULT_ACTIVE_INDEX);
          value ? setIsOpen(true) : setIsOpen(false);
        },
        onKeyDown: function onKeyDown(event) {
          return handleKeydown(event);
        }
      }),
      listbox: _objectSpread2({
        ref: listboxRef,
        id: listboxId,
        role: "listbox"
      }, labelRef.current && {
        "aria-labelledby": labelId
      }, {
        onMouseOut: function onMouseOut() {
          return setActiveIndex(DEFAULT_ACTIVE_INDEX);
        }
      }),
      listboxOption: function listboxOption(index) {
        optionsCount++;
        return {
          id: "".concat(name, "-option-").concat(index),
          role: "option",
          "aria-selected": index === activeIndex,
          onClick: function onClick() {
            return selectOption(index);
          },
          onMouseOver: function onMouseOver() {
            return setActiveIndex(index);
          }
        };
      }
    },
    value: value,
    activeIndex: activeIndex,
    isOpen: isOpen,
    handleOpen: function handleOpen() {
      setIsOpen(true);
      inputRef.current.focus();
    },
    handleClear: function handleClear() {
      setValue("");
      onChange("");
      setIsOpen(false);
    }
  };
};

export default useCombobox;
