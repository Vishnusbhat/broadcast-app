import React from "react";
import "./selector.css";
import CompanyInput from "./companyInput";
import ProfileInput from "./profileInput";
import Result from "./result";
import CommonProfileInput from "./commonProfileInput";
import CopyButton from "../copy";
import OpenGenerator from "../generator/open";
import { ImageOff } from "lucide-react";

const Selector = ({
  initForm,
  setInitForm,
  openForm,
  setOpenForm,
  resultForm,
  setResultForm,
  setBroadcast,
  broadcast,
}) => {
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setInitForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOpenFormChange = (key, value, index = null, toDelete = false) => {
    setOpenForm((prev) => {
      const updated = { ...prev };

      if (index === null) {
        if (key in prev.checkDepentent) {
          updated.checkDepentent = {
            ...prev.checkDepentent,
            [key]: value,
          };
        } else {
          updated[key] = value;
        }
      } else if (Array.isArray(prev[key])) {
        const copy = [...prev[key]];
        if (key === "branches" && !toDelete) {
          const nested = [...copy[index]];
          nested.push(value);
          copy[index] = nested;
        } else if (key === "branches" && toDelete) {
          const nested = [...copy[index]];
          const filtered = nested.filter((v) => v !== value);
          copy[index] = filtered;
        } else {
          copy[index] = value;
        }
        updated[key] = copy;
      }
      return updated;
    });
  };

  //   const handleResultFormChange = (name, toDelete = false) => {
  //     setResultForm((prev) => {
  //       const updated = { ...prev };
  //       if (toDelete) {
  // updated.students = updated.students.filter((student) => student !== name);
  //       } else {
  //         if (!updated.students.includes(name)) {
  //           updated.students.push(name);
  //         }
  //       }
  //       return updated;
  //     });
  //   };

  const handleResultFormChange = (list) => {
    setResultForm((prev) => ({
      ...prev,
      students: list,
    }));
  };

  const toggleResult = (value) => {
    console.log("Toggling result:", value);
    setResultForm((prev) => ({
      ...prev,
      result: value,
      students: value ? prev.students : [],
    }));
    console.log("Current resultForm:", resultForm.result);
  };

  return (
    <div className="selector-container">
      <select
        name="type"
        value={initForm.type}
        onChange={handleFormChange}
        className="options"
      >
        <option value="">Select Type</option>
        <option value="On-Campus">On-Campus</option>
        <option value="Off-Campus">Off-Campus</option>
      </select>

      <select
        name="course"
        value={initForm.course}
        onChange={handleFormChange}
        className="options"
      >
        <option value="">Select Course</option>
        <option value="BTech">BTech</option>
        <option value="MTech">MTech</option>
      </select>

      <select
        name="category"
        value={initForm.category}
        onChange={handleFormChange}
        className="options"
      >
        <option value="">Select Category</option>
        <option value="Open">Open</option>
        <option value="Update">Update</option>
        <option value="Results">Results</option>
      </select>

      {initForm.type !== "" && initForm.course !== "" && (
        <>
          {initForm.category === "Open" && (
            <>
              <CompanyInput
                openForm={openForm}
                handleFormChange={handleOpenFormChange}
              />
              <ProfileInput
                initForm={initForm}
                openForm={openForm}
                handleOpenFormChange={handleOpenFormChange}
              />
              <CommonProfileInput
                openForm={openForm}
                handleFormChange={handleOpenFormChange}
                initForm={initForm}
              />
              <OpenGenerator
                initForm={initForm}
                openForm={openForm}
                setBroadcast={setBroadcast}
              />
              <CopyButton broadcast={broadcast} />
            </>
          )}
          {initForm.category === "Update" && <></>}
          {initForm.category === "Results" && (
            <>
              <Result
                resultForm={resultForm}
                handleResultFormChange={handleResultFormChange}
                toggleResult={toggleResult}
                setBroadcast={setBroadcast}
                broadcast={broadcast}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Selector;
