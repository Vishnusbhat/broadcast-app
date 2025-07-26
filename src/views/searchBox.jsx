import React, { useState, useRef, useEffect } from "react";
import Papa from "papaparse";
import "./selector.css";

const SearchBox = ({ handleResultFormChange }) => {
  const [csvData, setCsvData] = useState([]);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedNames, setSelectedNames] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    fetch("public/data/students.csv")
      .then((res) => res.text())
      .then((csv) => {
        const result = Papa.parse(csv, { header: true });
        const names = result.data.map((row) => row.name).filter(Boolean);
        setCsvData(names);
      });
  }, []);

  const handleChange = (e) => {
    const input = e.target.value;
    setQuery(input);
    if (input.trim() === "") {
      setSuggestions([]);
      return;
    }

    const filtered = csvData
      .filter(
        (name) =>
          name.toLowerCase().startsWith(input.toLowerCase()) &&
          !selectedNames.includes(name)
      )
      .slice(0, 6);
    setSuggestions(filtered);
    setActiveIndex(-1);
  };

  const handleSuggestionClick = (name) => {
    const newSelected = [...selectedNames, name];
    const sorted = [...newSelected].sort(
      (a, b) => csvData.indexOf(a) - csvData.indexOf(b)
    );
    setSelectedNames(sorted);
    handleResultFormChange(sorted);
    setQuery("");
    setSuggestions([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      // setActiveIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
      setActiveIndex((prev) => prev === suggestions.length - 1 ? 0 : prev + 1 );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      // setActiveIndex((prev) => Math.max(prev - 1, 0));
      setActiveIndex((prev) => prev === 0 ? suggestions.length - 1 : prev - 1);
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        handleSuggestionClick(suggestions[activeIndex]);
      }
    }
  };

  const handleRemoveName = (nameToRemove) => {
    const filtered = selectedNames.filter((name) => name !== nameToRemove);
    const sorted = [...filtered].sort(
      (a, b) => csvData.indexOf(a) - csvData.indexOf(b)
    );
    setSelectedNames(sorted);
    handleResultFormChange(sorted);
  };

  useEffect(() => {
    if (activeIndex >= 0 && suggestionsRef.current) {
      const listItems = suggestionsRef.current.querySelectorAll("li");
      if (listItems[activeIndex]) {
        listItems[activeIndex].scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, [activeIndex]);

  return (
    <>
      <div className="name-input">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="company-name"
          placeholder="Search student..."
        />
      </div>
      {suggestions.length > 0 && (
        <div className="suggestion">
          <ul ref={suggestionsRef} style={{ padding: "0" }}>
            {suggestions.map((name, idx) => (
              <li
                key={name}
                onClick={() => handleSuggestionClick(name)}
                style={{
                  listStyle: "none",
                  padding: "5px",
                  backgroundColor:
                    idx === activeIndex
                      ? "rgba(226, 128, 0, 0.935)"
                      : "transparent",
                  cursor: "pointer",
                  color: idx === activeIndex ? "white" : "black",
                }}
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      )}
      {selectedNames.length > 0 && (
        <div className="selected-students">
          Selected Students:
          <ul>
            {selectedNames.map((name) => (
              <div className="names">
                <li key={name}>{name}</li>
                <div
                  className="button"
                  key={name - "li"}
                  onClick={() => handleRemoveName(name)}
                >
                  <svg className="close-svg" width="12" height="12" viewBox="0 0 24 24">
                    <path
                      d="M18 6L6 18M6 6l12 12"
                      stroke="black"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default SearchBox;
