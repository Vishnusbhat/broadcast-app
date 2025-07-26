import "./selector.css";
const CompanyInput = ({ openForm, handleFormChange }) => {
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
        <select
          name="slab"
          value={openForm.slab}
          onChange={(e) => handleFormChange("slab", e.target.value)}
          className="options"
        >
          <option value="">Select Slab</option>
          <option value="Internship">Internship</option>
          <option value="DIT">DIT</option>
          <option value="ODC">ODC</option>
          <option value="OD">OD</option>
          <option value="GOD">GOD</option>
        </select>
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
