import "./selector.css";
import Dropdown from "../components/dropdown";
const CompanyInput = ({ openForm, setOpenForm, handleFormChange }) => {
  const handleFormChangeDropDown = (value, name) => {
    setOpenForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <>
      <>
        <input
          type="text"
          name="companyName"
          value={openForm.companyName}
          onChange={(e) => handleFormChange("companyName", e.target.value)}
          className="company-name"
          placeholder="Company Name"
        />
        <Dropdown
          label="Select Slab"
          options={["Internship", "DIT", "ODC", "OD", "GOD"]}
          value={openForm.slab}
          onChange={(val) => handleFormChangeDropDown(val, "slab")}
        />
        {openForm.slab === "Internship" && (
          <div className="has-internship">
            <label>Has PBC?</label>
            <input
              type="checkbox"
              checked={openForm.hasFTE}
              onChange={(e) => handleFormChange("hasFTE", e.target.checked)}
            />
          </div>
        )}
        {openForm.slab !== "Internship" && (
          <div className="has-internship">
            <label>Has Internship?</label>
            <input
              type="checkbox"
              checked={openForm.hasInternship}
              onChange={(e) =>
                handleFormChange("hasInternship", e.target.checked)
              }
            />
          </div>
        )}
      </>
    </>
  );
};

export default CompanyInput;
