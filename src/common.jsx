import { useState, useEffect } from "react";
import Selector from "./views/selector";
import Preview from "./views/preview";
import Output from "./views/output";

const Common = () => {
  const [broadcast, setBroadcast] = useState("");
  const [notes, setNotes] = useState([]);
  const [openForm, setOpenForm] = useState({
    companyName: "",
    slab: "",
    hasInternship: false,
    hasFTE: false,
    profiles: [""],
    noOfProfiles: 1,
    stipends: [""],
    branches: [[]],
    ctcs: [""],
    locations: [""],
    durations: [""],
    tenth: [""],
    twelfth: [""],
    btech: [""],
    mtech: [""],
    activeBacklog: 0,
    isDeadBacklogAllowed: true,
    isDependent: false,
    checkDepentent: {
      stipend: false,
      ctc: false,
      location: false,
      durations: false,
      branch: false,
    },
  });

  useEffect(() => {
    const allFalse = Object.values(openForm.checkDepentent).every(
      (v) => v === false
    );
    setOpenForm((prev) => ({
      ...prev,
      isDependent: !allFalse,
    }));
  }, [openForm.checkDepentent]);

  const [resultForm, setResultForm] = useState({
    students: [],
    result: true,
  });

  const [initForm, setInitForm] = useState({
    type: "",
    course: "",
    category: "",
  });
  useEffect(() => {
    setBroadcast("");
    setOpenForm({
      companyName: "",
      slab: "",
      hasInternship: false,
      hasFTE: false,
      profiles: [""],
      noOfProfiles: 1,
      stipends: [""],
      branches: [[]],
      ctcs: [""],
      locations: [""],
      durations: [""],
      tenth: [""],
      twelfth: [""],
      btech: [""],
      mtech: [""],
      activeBacklog: 0,
      isDeadBacklogAllowed: true,
      isDependent: false,
      checkDepentent: {
        stipend: false,
        ctc: false,
        location: false,
        durations: false,
        branch: false,
      },
    });
  }, [initForm.category]);

  useEffect(() => {
    if (openForm.slab === "Internship")
      setOpenForm((prev) => ({
        ...prev,
        hasInternship: false,
      }));
    if (openForm.slab !== "Internship")
      setOpenForm((prev) => ({
        ...prev,
        hasFTE: false,
      }));
  }, [openForm.slab]);

  return (
    <>
      <Selector
        initForm={initForm}
        setInitForm={setInitForm}
        openForm={openForm}
        setOpenForm={setOpenForm}
        resultForm={resultForm}
        setResultForm={setResultForm}
        setBroadcast={setBroadcast}
        broadcast={broadcast}
        notes={notes}
        setNotes={setNotes}
      />
      {/* <Preview
        initForm={initForm}
        openForm={openForm}
        resultForm={resultForm}
        broadcast={broadcast}
      /> */}
      <Output broadcast={broadcast} />
    </>
  );
};
export default Common;
