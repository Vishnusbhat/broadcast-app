import { useState, useEffect } from "react";
import Selector from "./views/selector";
import Preview from "./views/preview";

const Common = () => {
  const [initForm, setInitForm] = useState({
    type: "",
    course: "",
    category: "",
  });

  const [broadcast, setBroadcast] = useState("");

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
      />
      <Preview
        initForm={initForm}
        openForm={openForm}
        resultForm={resultForm}
        broadcast={broadcast}
      />
    </>
  );
};
export default Common;
