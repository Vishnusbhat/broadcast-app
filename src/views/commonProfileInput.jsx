import "./selector.css";

const CommonProfileInput = ({ openForm, handleFormChange, initForm }) => {
  return (
    <>
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
        placeholder="Tenth Percentage"
        className="company-name"
        value={openForm.tenth[0] || ""}
        onChange={(e) => handleFormChange("tenth", e.target.value, 0)}
      />
      <input
        type="text"
        name="twelfth"
        placeholder="Twelfth Percentage"
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
