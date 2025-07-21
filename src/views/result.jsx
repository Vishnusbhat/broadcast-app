import SearchBox from "./searchBox";
import { useState } from "react";
import ResultGenerator from "../generator/result";

const Result = ({ resultForm, handleResultFormChange, toggleResult, broadcast, setBroadcast }) => {
  const [company, setCompany] = useState("");

    return (
    <div className="result-container">
        <label>
            Enter the company name:
            <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Company Name"
            />
        </label>
        <label>
            Is there a result?
            <input
                type="checkbox"
                checked={resultForm.result}
                onChange={(e) => toggleResult(e.target.checked)}
            />
        </label>
        {resultForm.result && (
            <>
            <SearchBox handleResultFormChange={handleResultFormChange} />
            <ResultGenerator
                resultForm={resultForm}
                company={company}
                setBroadcast={setBroadcast}
                broadcast={broadcast}
            />
            </>
        )}
    </div>
  );
};

export default Result;
