const CommonProfileInput = ({ openForm, handleFormChange, initForm }) => {
  return (
    <>
      {!openForm.checkDepentent.stipend &&
        (openForm.slab === "Internship" || openForm.hasInternship) && (
          <label>
            Stipend:
            <input
              type="text"
              name="stipend"
              value={openForm.stipends[0] || ""}
              onChange={(e) => handleFormChange("stipends", e.target.value, 0)}
            />
          </label>
        )}

      {!openForm.checkDepentent.ctc &&
        (openForm.slab !== "Internship" || openForm.hasFTE) && (
          <label>
            CTC:
            <input
              type="text"
              name="ctc"
              value={openForm.ctcs[0] || ""}
              onChange={(e) => handleFormChange("ctcs", e.target.value, 0)}
            />
          </label>
        )}
      {!openForm.checkDepentent.location && (
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={openForm.locations[0] || ""}
            onChange={(e) => handleFormChange("locations", e.target.value, 0)}
          />
        </label>
      )}
      {openForm.checkDepentent.durations && (
        <label>
          Duration:
          <input
            type="text"
            name="duration"
            value={openForm.durations[0] || ""}
            onChange={(e) => handleFormChange("durations", e.target.value, 0)}
          />
        </label>
      )}
      <label>
        Tenth Percentage:
        <input
          type="text"
          name="tenth"
          value={openForm.tenth[0] || ""}
          onChange={(e) => handleFormChange("tenth", e.target.value, 0)}
        />
      </label>
      <label>
        Twelfth Percentage:
        <input
          type="text"
          name="twelfth"
          value={openForm.twelfth[0] || ""}
          onChange={(e) => handleFormChange("twelfth", e.target.value, 0)}
        />
      </label>
      <label>
        BTech Percentage:
        <input
          type="text"
          name="btech"
          value={openForm.btech[0] || ""}
          onChange={(e) => handleFormChange("btech", e.target.value, 0)}
        />
      </label>
      {initForm.course === "MTech" && (
        <label>
          MTech Percentage:
          <input
            type="text"
            name="mtech"
            value={openForm.mtech[0] || ""}
            onChange={(e) => handleFormChange("mtech", e.target.value, 0)}
          />
        </label>
      )}
      <label>
        Number of active backlogs allowed:
        <input
          type="number"
          name="activeBacklog"
          value={openForm.activeBacklog}
          onChange={(e) =>
            handleFormChange("activeBacklog", Number(e.target.value), null)
          }
        />
      </label>
      <label>
        Is deadbacklogs allowed?
        <input
          type="checkbox"
          name="isDeadbacklogAllowed"
          checked={openForm.isDeadBacklogAllowed}
          onChange={(e) =>
            handleFormChange("isDeadBacklogAllowed", e.target.checked, null)
          }
        />
      </label>
    </>
  );
};

export default CommonProfileInput;
