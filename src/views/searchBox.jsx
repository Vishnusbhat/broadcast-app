import React, { useState, useRef, useEffect } from "react";
import Papa from "papaparse";

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
      .slice(0, 5);
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
      setActiveIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
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
    <div>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search name..."
      />
      {suggestions.length > 0 && (
        <ul ref={suggestionsRef}>
          {suggestions.map((name, idx) => (
            <li
              key={name}
              onClick={() => handleSuggestionClick(name)}
              style={{
                backgroundColor:
                  idx === activeIndex ? "#e0e0e0" : "transparent",
                cursor: "pointer",
              }}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
      {selectedNames.length > 0 && (
        <div>
          <h4>Selected:</h4>
          <ul>
            {selectedNames.map((name) => (
              <li key={name}>
                {name}
                <button onClick={() => handleRemoveName(name)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
