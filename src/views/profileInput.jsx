import React from 'react';

const ProfileInput = ({ initForm, openForm, handleOpenFormChange }) => {
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
        criteria: false
      });
    }
  };

  const handleChange = (index, value) => {
    handleOpenFormChange("profiles", value, index);
  };

  return (
    <div className="profile-input-container">
      {profiles.map((profile, index) => (
        <div key={index} className="profile-input-row">
          <div className="profile-input-header">
            <input
              type="text"
              className="profile-input"
              placeholder="Enter profile"
              value={profile}
              onChange={(e) => handleChange(index, e.target.value)}
            />
            {index === profiles.length - 1 ? (
              <button
                type="button"
                className="add-profile-button"
                onClick={addProfile}
                title="Add another profile"
              >
                +
              </button>
            ) : (
              <button
                type="button"
                className="remove-profile-button"
                onClick={() => removeProfile(index)}
                title="Remove this profile"
              >
                –
              </button>
            )}
            {openForm.checkDepentent.stipend && (
              <input
                type="text"
                className="profile-input"
                placeholder="Enter stipend"
                value={openForm.stipends[index] || ""}
                onChange={(e) =>
                  handleOpenFormChange("stipends", e.target.value, index)
                }
              />
            )}
            {openForm.checkDepentent.ctc && (
              <input
                type="text"
                className="profile-input"
                placeholder="Enter CTC"
                value={openForm.ctcs[index] || ""}
                onChange={(e) =>
                  handleOpenFormChange("ctcs", e.target.value, index)
                }
              />
            )}
            {openForm.checkDepentent.location && (
              <input
                type="text"
                className="profile-input"
                placeholder="Enter location"
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
                  className="profile-input"
                  placeholder="Enter Tenth Percentage"
                  value={openForm.tenth[index] || ""}
                  onChange={(e) =>
                    handleOpenFormChange("tenth", e.target.value, index)
                  }
                />
                <input
                  type="text"
                  className="profile-input"
                  placeholder="Enter Twelfth Percentage"
                  value={openForm.twelfth[index] || ""}
                  onChange={(e) =>
                    handleOpenFormChange("twelfth", e.target.value, index)
                  }
                />
                <input
                  type="text"
                  className="profile-input"
                  placeholder="Enter B.Tech Percentage"
                  value={openForm.btech[index] || ""}
                  onChange={(e) =>
                    handleOpenFormChange("btech", e.target.value, index)
                  }
                />
                {initForm.course === "MTech" && (
                  <input
                    type="text"
                    className="profile-input"
                    placeholder="Enter M.Tech Percentage (if applicable)"
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
                className="profile-input"
                placeholder="Enter Duration"
                value={openForm.durations[index] || ""}
                onChange={(e) =>
                  handleOpenFormChange("durations", e.target.value, index)
                }
              />
            )}
          </div>
        </div>
      ))}
      {profiles.length > 1 && (
        <div className="dependency-toggles">
          <label>
            Is stipend dependent on profile?
            <input
              type="checkbox"
              checked={openForm.checkDepentent.stipend}
              onChange={(e) =>
                handleOpenFormChange("stipend", e.target.checked)
              }
            />
          </label>

          <label>
            Is CTC dependent on profile?
            <input
              type="checkbox"
              checked={openForm.checkDepentent.ctc}
              onChange={(e) =>
                handleOpenFormChange("ctc", e.target.checked)
              }
            />
          </label>

          <label>
            Is location dependent on profile?
            <input
              type="checkbox"
              checked={openForm.checkDepentent.location}
              onChange={(e) =>
                handleOpenFormChange("location", e.target.checked)
              }
            />
          </label>

          <label>
            Is criteria dependent on profile?
            <input
              type="checkbox"
              checked={openForm.checkDepentent.criteria}
              onChange={(e) =>
                handleOpenFormChange("criteria", e.target.checked)
              }
            />
          </label>

          <label>
            Is duration dependent on profile?
            <input
              type="checkbox"
              checked={openForm.checkDepentent.durations}
              onChange={(e) =>
                handleOpenFormChange("durations", e.target.checked)
              }
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default ProfileInput;
