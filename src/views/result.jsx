import SearchBox from "./searchBox";
import { useState } from "react";
import ResultGenerator from "../generator/result";

import "./selector.css";

const Result = ({
  resultForm,
  handleResultFormChange,
  toggleResult,
  broadcast,
  setBroadcast,
  initForm,
}) => {
  const [company, setCompany] = useState("");

  return (
    <>
      <input
        type="text"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Company Name"
        className="company-name"
      />
      <div className="is-result">
        <label>Is there a result?</label>
        <input
          type="checkbox"
          checked={resultForm.result}
          onChange={(e) => toggleResult(e.target.checked)}
        />
      </div>
      {resultForm.result && (
        <SearchBox handleResultFormChange={handleResultFormChange} />
      )}
      <ResultGenerator
        resultForm={resultForm}
        company={company}
        setBroadcast={setBroadcast}
        broadcast={broadcast}
        initForm={initForm}
      />
    </>
  );
};

export default Result;
