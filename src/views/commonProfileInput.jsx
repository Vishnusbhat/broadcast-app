import "./selector.css";

const CommonProfileInput = ({ openForm, handleFormChange, initForm }) => {
  return (
    <>
      {!openForm.checkDepentent.branch && (
        <div className="branch-container">
          <div className="branch-heading">Eligible Branches</div>
          <div className="branch-list">
            <div
              className={`${
                openForm.branches[0].includes("Civil")
                  ? `branch-clicked add-background-color`
                  : `branch`
              }`}
              onClick={() => handleFormChange("branches", "Civil", 0)}
            >
              Civil
            </div>
            <div
              className={`${
                openForm.branches[0].includes("CSE")
                  ? `branch-clicked add-background-color`
                  : `branch`
              }`}
              onClick={() => handleFormChange("branches", "CSE", 0)}
            >
              CSE
            </div>
            <div
              className={`${
                openForm.branches[0].includes("ECE")
                  ? `branch-clicked add-background-color`
                  : `branch`
              }`}
              onClick={() => handleFormChange("branches", "ECE", 0)}
            >
              ECE
            </div>
          </div>
          <div className="branch-list">
            <div
              className={`${
                openForm.branches[0].includes("EEE")
                  ? `branch-clicked add-background-color`
                  : `branch`
              }`}
              onClick={() => handleFormChange("branches", "EEE", 0)}
            >
              EEE
            </div>
            {initForm.course === "BTech" && (
              <div
                className={`${
                  openForm.branches[0].includes("ISE")
                    ? `branch-clicked add-background-color`
                    : `branch`
                }`}
                onClick={() => handleFormChange("branches", "ISE", 0)}
              >
                ISE
              </div>
            )}
            <div
              className={`${
                openForm.branches[0].includes("Mech")
                  ? `branch-clicked add-background-color`
                  : `branch`
              }`}
              onClick={() => handleFormChange("branches", "Mech", 0)}
            >
              Mech
            </div>
          </div>
        </div>
      )}
      {!openForm.checkDepentent.stipend &&
        (openForm.slab === "Internship" || openForm.hasInternship) && (
          <input
            type="text"
            name="stipend"
            placeholder="Stipend"
            className="company-name"
            value={openForm.stipends[0] || ""}
            onChange={(e) => handleFormChange("stipends", e.target.value, 0)}
          />
        )}

      {!openForm.checkDepentent.ctc &&
        (openForm.slab !== "Internship" || openForm.hasFTE) && (
          <input
            type="text"
            name="ctc"
            placeholder="CTC"
            className="company-name"
            value={openForm.ctcs[0] || ""}
            onChange={(e) => handleFormChange("ctcs", e.target.value, 0)}
          />
        )}
      {!openForm.checkDepentent.location && (
        <input
          type="text"
          name="location"
          placeholder="Location"
          className="company-name"
          value={openForm.locations[0] || ""}
          onChange={(e) => handleFormChange("locations", e.target.value, 0)}
        />
      )}
      {!openForm.checkDepentent.durations && (
        <input
          type="text"
          name="duration"
          placeholder="Duration"
          className="company-name"
          value={openForm.durations[0] || ""}
          onChange={(e) => handleFormChange("durations", e.target.value, 0)}
        />
      )}
      <input
        type="text"
        name="tenth"
        placeholder="10th Percentage"
        className="company-name"
        value={openForm.tenth[0] || ""}
        onChange={(e) => handleFormChange("tenth", e.target.value, 0)}
      />
      <input
        type="text"
        name="twelfth"
        placeholder="12th Percentage"
        className="company-name"
        value={openForm.twelfth[0] || ""}
        onChange={(e) => handleFormChange("twelfth", e.target.value, 0)}
      />
      <input
        type="text"
        name="btech"
        placeholder="BTech CGPA"
        className="company-name"
        value={openForm.btech[0] || ""}
        onChange={(e) => handleFormChange("btech", e.target.value, 0)}
      />
      {initForm.course === "MTech" && (
        <input
          type="text"
          name="mtech"
          placeholder="MTech CGPA"
          className="company-name"
          value={openForm.mtech[0] || ""}
          onChange={(e) => handleFormChange("mtech", e.target.value, 0)}
        />
      )}
      <div className="row">
        Number of active backlogs allowed
        <input
          type="number"
          name="activeBacklog"
          value={openForm.activeBacklog}
          onChange={(e) =>
            handleFormChange("activeBacklog", Number(e.target.value), null)
          }
        />
      </div>
      <div className="row-2">
        Is deadbacklogs allowed?
        <input
          type="checkbox"
          name="isDeadbacklogAllowed"
          checked={openForm.isDeadBacklogAllowed}
          onChange={(e) =>
            handleFormChange("isDeadBacklogAllowed", e.target.checked, null)
          }
        />
      </div>
    </>
  );
};

export default CommonProfileInput;
