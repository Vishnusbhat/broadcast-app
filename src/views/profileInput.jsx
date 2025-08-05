import "./selector.css";
const ProfileInput = ({
  initForm,
  openForm,
  handleOpenFormChange,
  setOpenForm,
}) => {
  const profiles = openForm.profiles;

  const addProfile = () => {
    if (profiles[profiles.length - 1] === "") {
      alert("Please fill the last profile before adding a new one.");
      return;
    }
    handleOpenFormChange("profiles", "", profiles.length);
  };

  const removeProfile = (index) => {
    const updated = profiles.filter((_, i) => i !== index);
    handleOpenFormChange("profiles", updated);
    if (updated.length === 1) {
      handleOpenFormChange("checkDepentent", {
        stipend: false,
        ctc: false,
        location: false,
        durations: false,
        criteria: false,
        branch: false,
      });
      setOpenForm((prev) => {
        const update = { ...prev };
        if (index !== 0) {
          if (update.branches?.[index]) {
            update.branches[index].length = 0;
          }
          update.stipends.splice(index, 1);
          update.ctcs.splice(index, 1);
          update.locations.splice(index, 1);
          update.durations.splice(index, 1);
          update.tenth.splice(index, 1);
          update.twelfth.splice(index, 1);
          update.btech.splice(index, 1);
          update.mtech.splice(index, 1);
        }
        return update;
      });
    }
  };
  const handleChange = (index, value) => {
    handleOpenFormChange("profiles", value, index);
  };

  return (
    <div className="profile-input-container">
      <div className="profile-heading">
        <span>Profiles</span>
        <div
          type="button"
          className="button"
          style={{
            width: "16px",
            height: "16px",
          }}
          onClick={addProfile}
          title="Add another profile"
        >
          <svg
            width="20"
            height="20"
            className="plus-svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div>
      </div>
      {profiles.map((profile, index) => (
        <div
          key={index}
          className={`profile-input-row {
 ${openForm.isDependent && "add-gap"}`}
        >
          <div className="profile-input-header">
            <input
              type="text"
              className="profile-name"
              placeholder={`Enter Profile ${index + 1}`}
              value={profile}
              onChange={(e) => handleChange(index, e.target.value)}
            />
            {index === profiles.length - 1 ? (
              <>
                {index !== 0 && (
                  <div
                    type="button"
                    className="button"
                    onClick={() => removeProfile(index)}
                    title="Remove this profile"
                  >
                    <svg
                      className="minus-svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </div>
                )}
              </>
            ) : (
              <div
                type="button"
                className="button"
                onClick={() => removeProfile(index)}
                title="Remove this profile"
              >
                <svg
                  width="20"
                  height="20"
                  className="minus-svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </div>
            )}
          </div>
          {openForm.checkDepentent.branch && (
            <div className="branch-container">
              <div className="branch-heading">Eligible Branches</div>
              {initForm.course === "MTech" && (
                <div className="row-4">
                  Are only some sub-branches eligible?
                  <input
                    type="checkbox"
                    name="onlySubBranchesAllowed"
                    checked={openForm.onlySubBranchesAllowed[index]}
                    onChange={(e) =>
                      handleOpenFormChange(
                        "onlySubBranchesAllowed",
                        e.target.checked,
                        index
                      )
                    }
                  />
                </div>
              )}

              {!openForm.onlySubBranchesAllowed[index] && (
                <>
                  <div className="branch-list">
                    {initForm.course === "BTech" && (
                      <div
                        className={`${
                          openForm.branches[index]?.includes("AIML")
                            ? "branch-clicked add-background-color"
                            : "branch"
                        }`}
                        onClick={() =>
                          handleOpenFormChange("branches", "AIML", index)
                        }
                      >
                        AIML
                      </div>
                    )}
                    {["Civil", "CSE", "ECE"].map((branch) => (
                      <div
                        key={branch}
                        className={`${
                          openForm.branches[index]?.includes(branch)
                            ? "branch-clicked add-background-color"
                            : "branch"
                        }`}
                        onClick={() =>
                          handleOpenFormChange("branches", branch, index)
                        }
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
                          openForm.branches[index]?.includes(branch)
                            ? "branch-clicked add-background-color"
                            : "branch"
                        }`}
                        onClick={() =>
                          handleOpenFormChange("branches", branch, index)
                        }
                      >
                        {branch}
                      </div>
                    ))}

                    {initForm.course === "BTech" && (
                      <div
                        className={`${
                          openForm.branches[index]?.includes("ISE")
                            ? "branch-clicked add-background-color"
                            : "branch"
                        }`}
                        onClick={() =>
                          handleOpenFormChange("branches", "ISE", index)
                        }
                      >
                        ISE
                      </div>
                    )}
                  </div>
                </>
              )}
              {openForm.onlySubBranchesAllowed[index] && (
                <>
                  <div className="branch-list">
                    {["CSE", "IT", "CN", "WT", "CyS", "IoT"].map((branch) => (
                      <div
                        key={branch}
                        className={`${
                          openForm.branches[index]?.includes(branch)
                            ? "branch-clicked add-background-color"
                            : "branch"
                        }`}
                        onClick={() =>
                          handleOpenFormChange("branches", branch, index)
                        }
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
                          openForm.branches[index]?.includes(branch)
                            ? "branch-clicked add-background-color"
                            : "branch"
                        }`}
                        onClick={() =>
                          handleOpenFormChange("branches", branch, index)
                        }
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
                          openForm.branches[index]?.includes(branch)
                            ? "branch-clicked add-background-color"
                            : "branch"
                        }`}
                        onClick={() =>
                          handleOpenFormChange("branches", branch, index)
                        }
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
                          openForm.branches[index]?.includes(branch)
                            ? "branch-clicked add-background-color"
                            : "branch"
                        }`}
                        onClick={() =>
                          handleOpenFormChange("branches", branch, index)
                        }
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
                          openForm.branches[index]?.includes(branch)
                            ? "branch-clicked add-background-color"
                            : "branch"
                        }`}
                        onClick={() =>
                          handleOpenFormChange("branches", branch, index)
                        }
                      >
                        {branch}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
          {openForm.checkDepentent.stipend && (
            <input
              type="text"
              className="profile-name"
              placeholder={`Enter stipend (Profile ${index + 1})`}
              value={openForm.stipends[index] || ""}
              onChange={(e) =>
                handleOpenFormChange("stipends", e.target.value, index)
              }
            />
          )}
          {openForm.checkDepentent.ctc && (
            <input
              type="text"
              className="profile-name"
              placeholder={`Enter CTC (Profile ${index + 1})`}
              value={openForm.ctcs[index] || ""}
              onChange={(e) =>
                handleOpenFormChange("ctcs", e.target.value, index)
              }
            />
          )}
          {openForm.checkDepentent.bondDuration && (
            <input
              type="text"
              name="bondDuration"
              placeholder={`Bond Duration (Profile ${index + 1})`}
              className="profile-name"
              value={openForm.bondDuration[index] || ""}
              onChange={(e) =>
                handleOpenFormChange("bondDuration", e.target.value, index)
              }
            />
          )}
          {openForm.checkDepentent.bondPenalty && (
            <input
              type="text"
              name="bondPenalty"
              placeholder={`Bond Penalty (Profile ${index + 1})`}
              className="profile-name"
              value={openForm.bondPenalty[index] || ""}
              onChange={(e) =>
                handleOpenFormChange("bondPenalty", e.target.value, index)
              }
            />
          )}
          {openForm.checkDepentent.location && (
            <input
              type="text"
              className="profile-name"
              placeholder={`Enter location (Profile ${index + 1})`}
              value={openForm.locations[index] || ""}
              onChange={(e) =>
                handleOpenFormChange("locations", e.target.value, index)
              }
            />
          )}
          {openForm.checkDepentent.criteria && (
            <>
              <input
                type="text"
                className="profile-name"
                placeholder={`Enter 10th percentage (Profile ${index + 1})`}
                value={openForm.tenth[index] || ""}
                onChange={(e) =>
                  handleOpenFormChange("tenth", e.target.value, index)
                }
              />
              <input
                type="text"
                className="profile-name"
                placeholder={`Enter 12th percentage (Profile ${index + 1})`}
                value={openForm.twelfth[index] || ""}
                onChange={(e) =>
                  handleOpenFormChange("twelfth", e.target.value, index)
                }
              />
              <input
                type="text"
                className="profile-name"
                placeholder={`Enter BTech CGPA (Profile ${index + 1})`}
                value={openForm.btech[index] || ""}
                onChange={(e) =>
                  handleOpenFormChange("btech", e.target.value, index)
                }
              />
              {initForm.course === "MTech" && (
                <input
                  type="text"
                  className="profile-name"
                  placeholder={`Enter MTech CGPA (Profile ${index + 1})`}
                  value={openForm.mtech[index] || ""}
                  onChange={(e) =>
                    handleOpenFormChange("mtech", e.target.value, index)
                  }
                />
              )}
            </>
          )}
          {openForm.checkDepentent.durations && (
            <input
              type="text"
              className="profile-name"
              placeholder={`Enter Duration (Profile ${index + 1})`}
              value={openForm.durations[index] || ""}
              onChange={(e) =>
                handleOpenFormChange("durations", e.target.value, index)
              }
            />
          )}
        </div>
      ))}
      {profiles.length > 1 && (
        <div className="dependency-toggles">
          <div className="row">
            Is stipend dependent on profile?
            <input
              type="checkbox"
              checked={openForm.checkDepentent.stipend}
              onChange={(e) =>
                handleOpenFormChange("stipend", e.target.checked)
              }
            />
          </div>

          <div className="row">
            Is CTC dependent on profile?
            <input
              type="checkbox"
              checked={openForm.checkDepentent.ctc}
              onChange={(e) => handleOpenFormChange("ctc", e.target.checked)}
            />
          </div>
          <div className="row">
            Is Bond Penalty on profile?
            <input
              type="checkbox"
              checked={openForm.checkDepentent.bondPenalty}
              onChange={(e) =>
                handleOpenFormChange("bondPenalty", e.target.checked)
              }
            />
          </div>
          <div className="row">
            Is Bond Duration dependent on profile?
            <input
              type="checkbox"
              checked={openForm.checkDepentent.bondDuration}
              onChange={(e) =>
                handleOpenFormChange("bondDuration", e.target.checked)
              }
            />
          </div>

          <div className="row">
            Is location dependent on profile?
            <input
              type="checkbox"
              checked={openForm.checkDepentent.location}
              onChange={(e) =>
                handleOpenFormChange("location", e.target.checked)
              }
            />
          </div>
          <div className="row">
            Is branch dependent on profile?
            <input
              type="checkbox"
              checked={openForm.checkDepentent.branch}
              onChange={(e) => handleOpenFormChange("branch", e.target.checked)}
            />
          </div>

          <div className="row">
            Is duration dependent on profile?
            <input
              type="checkbox"
              checked={openForm.checkDepentent.durations}
              onChange={(e) =>
                handleOpenFormChange("durations", e.target.checked)
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileInput;
