import "./companyInput.css";
const CompanyInput = ({ openForm, handleFormChange }) => {
  return (
    <>
      <div className="company-input-container">
        <input
          type="text"
          name="companyName"
          value={openForm.companyName}
          onChange={(e) => handleFormChange("companyName", e.target.value)}
          placeholder="Company Name"
        />
        <select
          name="slab"
          value={openForm.slab}
          onChange={(e) => handleFormChange("slab", e.target.value)}
        >
          <option value="">Select Slab</option>
          <option value="Internship">Internship</option>
          <option value="DIT">DIT</option>
          <option value="ODC">ODC</option>
          <option value="OD">OD</option>
          <option value="GOD">GOD</option>
        </select>
        {openForm.slab === "Internship" && (
            <>
            <input
              type="checkbox"
              checked={openForm.hasFTE}
              onChange={(e) => handleFormChange("hasFTE", e.target.checked)}
            />
            <label>Has PBC?</label>
            </>
        )}  
        {openForm.slab !== "Internship" && (
            <>
            <input
              type="checkbox"
              checked={openForm.hasInternship}
              onChange={(e) => handleFormChange("hasInternship", e.target.checked)}
            />
            <label>Has Internship?</label>
            </>
        )}  
      </div>
    </>
  );
};

export default CompanyInput;
