import "./selector.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, isTomorrow, isToday, isValid } from "date-fns";
import React from "react";
import Dropdown from "../components/dropdown";

const CommonProfileInput = ({ openForm, handleFormChange, initForm }) => {
  const CustomDateInput = React.forwardRef(({ value, onClick }, ref) => (
    <input
      type="text"
      onClick={onClick}
      value={value}
      readOnly
      ref={ref}
      className="company-name"
    />
  ));

  const getLabel = (date, wantTime = true) => {
    if (!date || !isValid(new Date(date))) return "";
    if (wantTime) {
      if (isToday(date)) return format(date, "do MMMM yyyy, h:mm aa '(Today)'");
      if (isTomorrow(date))
        return format(date, "do MMMM yyyy, h:mm aa '(Tomorrow)'");
      return format(date, "do MMMM yyyy, h:mm aa (EEEE)");
    } else {
      if (isToday(date)) return format(date, "do MMMM yyyy '(Today)'");
      if (isTomorrow(date)) return format(date, "do MMMM yyyy '(Tomorrow)'");
      return format(date, "do MMMM yyyy (EEEE)");
    }
  };
  return (
    <>
      {!openForm.checkDepentent.branch && (
        <div className="branch-container">
          <div className="branch-heading">Eligible Branches</div>
          {initForm.course === "MTech" && (
            <div className="row-4">
              Are only some sub-branches eligible?
              <input
                type="checkbox"
                name="onlySubBranchesAllowed"
                checked={openForm.onlySubBranchesAllowed[0]}
                onChange={(e) =>
                  handleFormChange(
                    "onlySubBranchesAllowed",
                    e.target.checked,
                    0
                  )
                }
              />
            </div>
          )}

          {!openForm.onlySubBranchesAllowed[0] && (
            <>
              <div className="branch-list">
                {initForm.course === "BTech" && (
                  <div
                    className={`${
                      openForm.branches[0].includes("AIML")
                        ? "branch-clicked add-background-color"
                        : "branch"
                    }`}
                    onClick={() => handleFormChange("branches", "AIML", 0)}
                  >
                    AIML
                  </div>
                )}
                {["Civil", "CSE", "ECE"].map((branch) => (
                  <div
                    key={branch}
                    className={`${
                      openForm.branches[0].includes(branch)
                        ? "branch-clicked add-background-color"
                        : "branch"
                    }`}
                    onClick={() => handleFormChange("branches", branch, 0)}
                  >
                    {branch}
                  </div>
                ))}
              </div>

              <div className="branch-list">
                {["EEE", "Mech"].map((branch) => (
                  <div
                    key={branch}
                    className={`${
                      openForm.branches[0].includes(branch)
                        ? "branch-clicked add-background-color"
                        : "branch"
                    }`}
                    onClick={() => handleFormChange("branches", branch, 0)}
                  >
                    {branch}
                  </div>
                ))}

                {initForm.course === "BTech" && (
                  <div
                    className={`${
                      openForm.branches[0].includes("ISE")
                        ? "branch-clicked add-background-color"
                        : "branch"
                    }`}
                    onClick={() => handleFormChange("branches", "ISE", 0)}
                  >
                    ISE
                  </div>
                )}
              </div>
            </>
          )}
          {openForm.onlySubBranchesAllowed[0] && (
            <>
              <div className="branch-list">
                {["CSE", "IT", "CN", "WT", "CyS", "IoT"].map((branch) => (
                  <div
                    key={branch}
                    className={`${
                      openForm.branches[0].includes(branch)
                        ? "branch-clicked add-background-color"
                        : "branch"
                    }`}
                    onClick={() => handleFormChange("branches", branch, 0)}
                  >
                    {branch}
                  </div>
                ))}
              </div>

              <div className="branch-list">
                {["ECE", "PES", "PE", "CIE"].map((branch) => (
                  <div
                    key={branch}
                    className={`${
                      openForm.branches[0].includes(branch)
                        ? "branch-clicked add-background-color"
                        : "branch"
                    }`}
                    onClick={() => handleFormChange("branches", branch, 0)}
                  >
                    {branch}
                  </div>
                ))}
              </div>
              <div className="branch-list">
                {["MD", "MSE", "TSE", "AMT"].map((branch) => (
                  <div
                    key={branch}
                    className={`${
                      openForm.branches[0].includes(branch)
                        ? "branch-clicked add-background-color"
                        : "branch"
                    }`}
                    onClick={() => handleFormChange("branches", branch, 0)}
                  >
                    {branch}
                  </div>
                ))}
              </div>
              <div className="branch-list">
                {["EnV", "HE", "GE", "PSE"].map((branch) => (
                  <div
                    key={branch}
                    className={`${
                      openForm.branches[0].includes(branch)
                        ? "branch-clicked add-background-color"
                        : "branch"
                    }`}
                    onClick={() => handleFormChange("branches", branch, 0)}
                  >
                    {branch}
                  </div>
                ))}
              </div>
              <div className="branch-list">
                {["CT", "WRE", "StE", "EaE"].map((branch) => (
                  <div
                    key={branch}
                    className={`${
                      openForm.branches[0].includes(branch)
                        ? "branch-clicked add-background-color"
                        : "branch"
                    }`}
                    onClick={() => handleFormChange("branches", branch, 0)}
                  >
                    {branch}
                  </div>
                ))}
              </div>
            </>
          )}
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
      {!openForm.checkDepentent.bondDuration && (
        <input
          type="text"
          name="bondDuration"
          placeholder="Service Bond Duration"
          className="company-name"
          value={openForm.bondDuration[0] || ""}
          onChange={(e) => handleFormChange("bondDuration", e.target.value, 0)}
        />
      )}
      {!openForm.checkDepentent.bondPenalty && (
        <input
          type="text"
          name="bondPenalty"
          placeholder="Service Bond Penalty"
          className="company-name"
          value={openForm.bondPenalty[0] || ""}
          onChange={(e) => handleFormChange("bondPenalty", e.target.value, 0)}
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
          min={0}
          name="activeBacklog"
          value={openForm.activeBacklog}
          onChange={(e) => {
            console.log(typeof e.target.value);
            if (e.target.value.startsWith("-") || e.target.value.length >= 2)
              e.target.value = 0;
            handleFormChange("activeBacklog", e.target.value, null);
          }}
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
      <div className="row-3">
        Expected Date of Joining
        <Dropdown
          label="Select DoJ"
          options={[
            "-- Pick Date --",
            "Immediate",
            "January 2026",
            "February 2026",
            "March 2026",
            "April 2026",
            "May 2026",
            "June 2026",
            "July 2026",
          ]}
          value={openForm.doj}
          onChange={(value) => handleFormChange("doj", value, null)}
        />
      </div>
      {openForm.doj === "-- Pick Date --" && (
        <div className="row-3">
          Pick Expected Date of Joining
          <DatePicker
            selected={
              openForm.expectedDateOfJoining
                ? new Date(openForm.expectedDateOfJoining)
                : null
            }
            showIcon
            onChange={(date) =>
              handleFormChange(
                "expectedDateOfJoining",
                date?.getTime() ?? null,
                null
              )
            }
            minDate={new Date()}
            dateFormat="Pp"
            value={getLabel(new Date(openForm.expectedDateOfJoining), false)}
            highlightDates={[new Date()]}
            customInput={
              <CustomDateInput
                value={
                  openForm.expectedDateOfJoining
                    ? getLabel(new Date(openForm.expectedDateOfJoining), false)
                    : ""
                }
              />
            }
          />
        </div>
      )}

      <div className="row-3">
        Date of Drive
        <Dropdown
          label="Select DoJ"
          options={["TBA", "-- Pick Date --"]}
          value={openForm.dod}
          onChange={(value) => handleFormChange("dod", value, null)}
        />
      </div>

      {openForm.dod === "-- Pick Date --" && (
        <div className="row-3">
          Pick Date of Drive
          <DatePicker
            selected={
              openForm.dateOfDrive ? new Date(openForm.dateOfDrive) : null
            }
            showIcon
            onChange={(date) =>
              handleFormChange("dateOfDrive", date?.getTime() ?? null, null)
            }
            minDate={new Date()}
            dateFormat="Pp"
            value={getLabel(new Date(openForm.dateOfDrive), false)}
            highlightDates={[new Date()]}
            customInput={
              <CustomDateInput
                value={
                  openForm.dateOfDrive
                    ? getLabel(new Date(openForm.dateOfDrive), false)
                    : ""
                }
              />
            }
          />
        </div>
      )}

      <div className="row-3">
        Mode of Drive
        <Dropdown
          // label="Select Mode of Drive"
          options={["Hybrid", "Virtual"]}
          value={openForm.modeOfDrive}
          onChange={(value) => handleFormChange("modeOfDrive", value, null)}
        />
      </div>

      <div className="row-3">
        Deadline for Registration
        <DatePicker
          selected={new Date(openForm.deadlineForRegistration)}
          showIcon
          onChange={(date) =>
            handleFormChange(
              "deadlineForRegistration",
              date?.getTime() ?? null,
              null
            )
          }
          highlightDates={[new Date()]}
          minDate={new Date()}
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
