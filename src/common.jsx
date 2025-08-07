import { useState, useEffect } from "react";
import Selector from "./views/selector";
import Preview from "./views/preview";
import Output from "./views/output";
import { fetchCurrentDBState, getDeadline, modifyDeadline } from "./utils/deadline";

const Common = () => {
  const [broadcast, setBroadcast] = useState("");
  const [notes, setNotes] = useState([]);
  const [openForm, setOpenForm] = useState({
    companyName: "",
    slab: "",
    hasInternship: false,
    hasFTE: false,
    hasCTC: true,
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
      bondDuration: false,
      bondPenalty: false,
    },
    doj: "",
    dod: "TBA",
    dateOfDrive: Date.now(),
    modeOfDrive: "Virtual",
    bondPenalty: [""],
    bondDuration: [""],
    registrationLink: "",
    hasProfileChoice: false,
    expectedDateOfJoining: new Date("January 1, 2026").getTime(),
    deadlineForRegistration: Date.now(),
    onlySubBranchesAllowed: [],
    backupSubBranchCompare: [],
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
    type: "On-Campus",
    course: "BTech",
    category: "Open",
  });
  useEffect(() => {
    setBroadcast("");
    setOpenForm({
      companyName: "",
      slab: "",
      hasInternship: false,
      hasFTE: false,
      hasCTC: true,
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
        bondDuration: false,
        bondPenalty: false,
      },
      doj: "",
      modeOfDrive: "Virtual",
      dod: "TBA",
      bondPenalty: [""],
      bondDuration: [""],
      dateOfDrive: Date.now(),
      registrationLink: "",
      hasProfileChoice: false,
      expectedDateOfJoining: new Date("January 1, 2026").getTime(),
      deadlineForRegistration: getDeadline(Date.now()),
      onlySubBranchesAllowed: [],
      backupSubBranchCompare: [],
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

  useEffect(() => {
    setOpenForm((prev) => {
      const p = { ...prev };
      if (initForm.course === "BTech") p.onlySubBranchesAllowed.fill(false);
      p.branches = [[]];
      return p;
    });
  }, [initForm.course]);

  useEffect(() => {
    setOpenForm((prev) => {
      const p = { ...prev };
      for (let i = 0; i < p.onlySubBranchesAllowed.length; i++) {
        if (p.onlySubBranchesAllowed[i] !== p.backupSubBranchCompare[i]) {
          p.backupSubBranchCompare[i] = p.onlySubBranchesAllowed[i];
          p.branches[i] = [];
        }
      }
      return p;
    });
  }, [openForm.onlySubBranchesAllowed]);

  useEffect(() => {
    setOpenForm((prev) => {
      const p = { ...prev };
      const isolated = getDeadline(Date.now());
      console.log('original deadline: ' + isolated);
      const current_state = fetchCurrentDBState();
      const finalDeadline = modifyDeadline(
        isolated,
        p.branches,
        current_state
      );

      p.deadlineForRegistration = finalDeadline;
      // p.deadlineForRegistration = isolated;
      return p;
    });
  }, []);

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
      <Output broadcast={broadcast} setOpenForm={setOpenForm}/>
    </>
  );
};
export default Common;
