import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

const Dropdown = ({
  options = [],
  selected,
  onSelect,
  placeholder = "",
  disabled = false,
}) => {
  const [search, setSearch] = useState(selected || "");
  const [show, setShow] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const containerRef = useRef(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    setSearch(selected || "");
  }, [selected]);


  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(search.toLowerCase())
  );

  const handleKeyDown = (e) => {
    if (!show) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => Math.min(prev + 1, filteredOptions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && highlightIndex >= 0) {
      e.preventDefault();
      onSelect(filteredOptions[highlightIndex]);
      setSearch(filteredOptions[highlightIndex]);
      setShow(false);
      setHighlightIndex(-1);
    } else if (e.key === "Escape") {
      setShow(false);
      setHighlightIndex(-1);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (show && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [show]);

  return (
    <div className="relative" ref={containerRef}>
      <input
        type="text"
        value={search}
        placeholder={placeholder}
        disabled={disabled}
        onClick={() => setShow(true)}
        onChange={(e) => {
          setSearch(e.target.value);
          setShow(true);
          setHighlightIndex(-1);
        }}
        onKeyDown={handleKeyDown}
        className="w-full p-3 bg-white/20 backdrop-blur-lg rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {show && filteredOptions.length > 0 &&
        createPortal(
          <AnimatePresence>
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white border border-gray-300 rounded-lg max-h-60 overflow-y-auto shadow-lg z-[9999] absolute"
              style={{
                top: dropdownPosition.top,
                left: dropdownPosition.left,
                width: dropdownPosition.width,
              }}
            >
              {filteredOptions.map((opt, index) => (
                <li
                  key={opt}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    onSelect(opt);
                    setSearch(opt);
                    setShow(false);
                    setHighlightIndex(-1);
                  }}
                  className={`px-3 py-2 cursor-pointer ${
                    index === highlightIndex ? "bg-blue-100" : "hover:bg-blue-50"
                  }`}
                >
                  {opt}
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
};

export default Dropdown;
