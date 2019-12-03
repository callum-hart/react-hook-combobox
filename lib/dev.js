'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

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

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
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

  var _useState = react.useState(initialValue),
      _useState2 = _slicedToArray(_useState, 2),
      term = _useState2[0],
      setTerm = _useState2[1];

  var _useState3 = react.useState(DEFAULT_ACTIVE_INDEX),
      _useState4 = _slicedToArray(_useState3, 2),
      activeIndex = _useState4[0],
      setActiveIndex = _useState4[1];

  var _useState5 = react.useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      isOpen = _useState6[0],
      setIsOpen = _useState6[1];

  var containerRef = react.useRef(null);
  var labelRef = react.useRef(null);
  var inputRef = react.useRef(null);
  var listboxRef = react.useRef(null);
  var labelId = "".concat(name, "-label");
  var inputId = "".concat(name, "-input");
  var listboxId = "".concat(name, "-listbox");
  var termHasFocus = inputRef.current && inputRef.current === document.activeElement;
  var optionsCount = 0;
  react.useEffect(function () {
    if (termHasFocus) {
      document.addEventListener("keydown", handleDocumentKeydown);
      return function () {
        return document.removeEventListener("keydown", handleDocumentKeydown);
      };
    }
  });
  react.useEffect(function () {
    if (termHasFocus) {
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

  var handlePageDown = function handlePageDown() {
    handleNewActiveIndex(optionsCount - 1);
  };

  var handlePageUp = function handlePageUp() {
    handleNewActiveIndex(0);
  };

  var handleNewActiveIndex = function handleNewActiveIndex(newActiveIndex) {
    if (listboxRef.current && listboxRef.current.children && listboxRef.current.children[newActiveIndex]) {
      listboxRef.current.children[newActiveIndex].scrollIntoView();
      setActiveIndex(newActiveIndex);
    }
  };

  var handleEnter = function handleEnter() {
    return selectOption(activeIndex);
  };

  var handleTab = function handleTab() {
    inputRef.current.blur();
    setActiveIndex(DEFAULT_ACTIVE_INDEX);
    setIsOpen(false);
  };

  var handleEscape = function handleEscape() {
    setTerm("");
    setActiveIndex(DEFAULT_ACTIVE_INDEX);
    setIsOpen(false);
  };

  var handleDocumentKeydown = function handleDocumentKeydown(_ref2) {
    var key = _ref2.key;

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

  var handleDocumentClick = function handleDocumentClick(_ref3) {
    var target = _ref3.target;

    if (isOpen && !containerRef.current.contains(target)) {
      inputRef.current.blur();
      setActiveIndex(DEFAULT_ACTIVE_INDEX);
      setIsOpen(false);
    }
  };

  var selectOption = function selectOption(index) {
    var displayName = optionToString(index);

    if (displayName) {
      setTerm(displayName);
      onChange(displayName, index);
      setIsOpen(false);
    } // else user pressed enter without a term present

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
        value: term,
        id: inputId,
        autoComplete: "off",
        "aria-autocomplete": "list",
        // try 'both' / setSelectionRange
        "aria-controls": listboxId
      }, isOpen && activeIndex > DEFAULT_ACTIVE_INDEX && {
        "aria-activedescendant": "".concat(name, "-option-").concat(activeIndex)
      }, {}, labelRef.current && {
        "aria-labelledby": labelId
      }, {
        onFocus: function onFocus() {
          return setIsOpen(true);
        },
        onChange: function onChange(_ref4) {
          var value = _ref4.target.value;
          setTerm(value);
          setActiveIndex(DEFAULT_ACTIVE_INDEX);
          setIsOpen(true);
        }
      }),
      listbox: _objectSpread2({
        ref: listboxRef,
        id: listboxId,
        role: "listbox"
      }, labelRef.current && {
        "aria-labelledby": labelId
      }),
      listboxOption: function listboxOption(index) {
        optionsCount++;
        return {
          id: "".concat(name, "-option-").concat(index),
          role: "option",
          "aria-selected": index === activeIndex,
          onClick: function onClick() {
            return selectOption(index);
          }
        };
      }
    },
    term: term,
    activeIndex: activeIndex,
    isOpen: isOpen,
    handleReset: function handleReset() {
      setTerm("");
      setActiveIndex(DEFAULT_ACTIVE_INDEX);
      onChange("");
    },
    handleSearch: function handleSearch() {
      setTerm(term);
      setActiveIndex(DEFAULT_ACTIVE_INDEX);
      onChange(term);
      setIsOpen(false);
    }
  };
};

var Combobox = function Combobox(_ref5) {
  var children = _ref5.children,
      otherProps = _objectWithoutProperties(_ref5, ["children"]);

  var comboboxGoodies = useCombobox(_objectSpread2({}, otherProps));
  return children(_objectSpread2({}, comboboxGoodies));
};

exports.Combobox = Combobox;
exports.default = useCombobox;
