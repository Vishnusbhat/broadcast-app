import React from "react";
import "./selector.css";
import CompanyInput from "./companyInput";
import ProfileInput from "./profileInput";
import Result from "./result";
import CommonProfileInput from "./commonProfileInput";
import CopyButton from "../copy";
import OpenGenerator from "../generator/open";
import Dropdown from "../components/dropdown";
import NoteSection from "../components/notesection";

const Selector = ({
  initForm,
  setInitForm,
  openForm,
  setOpenForm,
  resultForm,
  setResultForm,
  setBroadcast,
  broadcast,
  notes,
  setNotes,
}) => {
  const handleFormChangeDropDown = (value, name) => {
    setInitForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOpenFormChange = (key, value, index = null) => {
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
        if (key === "branches") {
          const nested = Array.isArray(copy[index]) ? [...copy[index]] : [];
          if (!nested.includes(value)) {
            nested.push(value);
            nested.sort((a, b) =>
              a.toLowerCase().localeCompare(b.toLowerCase())
            );
            copy[index] = nested;
          } else {
            const filtered = nested.filter((v) => v !== value);
            filtered.sort((a, b) =>
              a.toLowerCase().localeCompare(b.toLowerCase())
            );
            copy[index] = filtered;
          }
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

  // useEffect(() => {
  //   setOpenForm((prevForm) => {
  //     const updated = { ...prevForm };

  //     if (prevForm.checkDepentent.branch) {
  //       const length = prevForm.profiles.length || 1;
  //       updated.branches = Array.from({ length }, () => []);
  //     } else {
  //       updated.branches = [prevForm.branches[0] || []];
  //     }

  //     return updated;
  //   });
  // }, [openForm.checkDepentent.branch, openForm.profiles.length]);

  return (
    <div className="selector-container">
      <CopyButton broadcast={broadcast} />
      {/* <div className="options-container"> */}
      <>
        <Dropdown
          label="Select Type"
          options={["On-Campus", "Off-Campus"]}
          value={initForm.type}
          onChange={(val) => handleFormChangeDropDown(val, "type")}
        />

        <Dropdown
          label="Select Course"
          options={["BTech", "MTech"]}
          value={initForm.course}
          onChange={(val) => handleFormChangeDropDown(val, "course")}
        />

        <Dropdown
          label="Select Broadcast Category"
          options={["Open", "Update", "Results"]}
          value={initForm.category}
          onChange={(val) => handleFormChangeDropDown(val, "category")}
        />
      </>
      {/* </div> */}

      {initForm.type !== "" && initForm.course !== "" && (
        <>
          {initForm.category === "Open" && (
            <>
              <CompanyInput
                openForm={openForm}
                handleFormChange={handleOpenFormChange}
                setOpenForm={setOpenForm}
              />
              <ProfileInput
                initForm={initForm}
                openForm={openForm}
                handleOpenFormChange={handleOpenFormChange}
                setOpenForm={setOpenForm}
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
                notes={notes}
              />
              <NoteSection filename="open.txt" notes={notes} setNotes={setNotes}/>
            </>
          )}
          {initForm.category === "Update" && <></>}
          {initForm.category === "Results" && (
            <>
              <Result
                initForm={initForm}
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
