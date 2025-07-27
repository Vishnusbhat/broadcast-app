import "./dropdown.css";
import { useState, useRef, useEffect } from "react";

const Dropdown = ({ label = "Select", options = [], value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div ref={dropdownRef} className="container">
      <div
        className="dropdown-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {value || label}
        <div className="icon">
          <svg
            style={isOpen ? { transform: "rotate(180deg)", transition: "transform 0.3s ease" } : { transition: "transform 0.3s ease" }}
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>

      {isOpen && (
        // <div className="dropdown-menu">

        <>
          {options
          .filter((option) => {
            return option !== value;
          })
          .map((option) => {
            return (
              <div
                key={option}
                className="dropdown-item"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </div>
            );
          })}
          {/* </div> */}
        </>
      )}
    </div>
  );
};

export default Dropdown;
