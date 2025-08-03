import "./selector.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, isTomorrow, isToday, isValid } from "date-fns";
import React from "react";

const CommonProfileInput = ({ openForm, handleFormChange, initForm }) => {
  const CustomDateInput = React.forwardRef(({ value, onClick }, ref) => (
    <input
      type="text"
      onClick={onClick}
      value={value}
      readOnly
      ref={ref}
      className="your-input-class"
    />
  ));

  const getLabel = (date, wantTime = true) => {
    if (!date || !isValid(new Date(date))) return "";
    if (wantTime) {
      if (isToday(date)) return format(date, "do MMMM yyyy '(Today)', h:mm aa");
      if (isTomorrow(date))
        return format(date, "do MMMM yyyy '(Tomorrow)', h:mm aa");
    } else {
      if (isToday(date)) return format(date, "do MMMM yyyy '(Today)'");
      if (isTomorrow(date)) return format(date, "do MMMM yyyy '(Tomorrow)'");
    }
    return format(date, "do MMMM yyyy (EEEE), h:mm aa");
  };
  return (
    <>
      {!openForm.checkDepentent.branch && (
        <div className="branch-container">
          <div className="branch-heading">Eligible Branches</div>
          <div className="branch-list">
            {initForm.course === "BTech" && (
              <div
                className={`${
                  openForm.branches[0].includes("AIML")
                    ? `branch-clicked add-background-color`
                    : `branch`
                }`}
                onClick={() => handleFormChange("branches", "AIML", 0)}
              >
                AIML
              </div>
            )}
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
            handleFormChange("activeBacklog", e.target.value, null)
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
      <DatePicker
        selected={
          openForm.expectedDateOfJoining
            ? new Date(openForm.expectedDateOfJoining)
            : null
        }
        onChange={(date) =>
          handleFormChange(
            "expectedDateOfJoining",
            date?.getTime() ?? null,
            null
          )
        }
        customInput={
          <CustomDateInput
            value={
              openForm.expectedDateOfJoining
                ? getLabel(new Date(openForm.expectedDateOfJoining))
                : ""
            }
          />
        }
      />

      <div className="row-3">
        Deadline for Registration
        <DatePicker
          selected={new Date(openForm.deadlineForRegistration)}
          onChange={(date) =>
            handleFormChange(
              "deadlineForRegistration",
              date?.getTime() ?? null,
              null
            )
          }
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={30}
          timeCaption="Time"
          // onFocus={(e) => e.target.blur()}
          dateFormat="Pp"
          value={getLabel(new Date(openForm.deadlineForRegistration))}
          customInput={
            <CustomDateInput
              value={getLabel(new Date(openForm.deadlineForRegistration))}
            />
          }
          popperPlacement="bottom-start"
        />
      </div>
    </>
  );
};

export default CommonProfileInput;
