import { useEffect } from "react";
import { format, isToday, isTomorrow } from "date-fns";

const OpenGenerator = ({ initForm, openForm, setBroadcast, notes }) => {
  useEffect(() => {
    let message = gen({ initForm, openForm });
    if (initForm.type === "On-Campus") {
      message += "\nNote:\n";
    } else {
      message += "\n*Note:*\n";
    }
    notes.map((note, index) => {
      message += `${index + 1}. ${note}\n`;
    });
    message += "\nRegards,\nTPO";
    setBroadcast(message);
  }, [initForm, openForm, setBroadcast, notes]);

  return null;
};
const formatWithLabel = (date, wantTime = false) => {
  const d = new Date(date);

  if (!date || isNaN(d)) return "";

  // Assign formatted string to baseFormat
  let baseFormat = wantTime
    ? format(d, "do MMMM yyyy, h:mm a (EEEE)")
    : format(d, "do MMMM yyyy (EEEE)");

  // Add "Today"/"Tomorrow" label if needed
  if (isToday(d)) {
    return baseFormat.replace(/\(.*?\)/, `(Today)`);
  } else if (isTomorrow(d)) {
    return baseFormat.replace(/\(.*?\)/, `(Tomorrow)`);
  }

  return baseFormat;
};


const gen = ({ initForm, openForm }) => {
  let result = ``;
  //company name
  {
    initForm.type === "On-Campus"
      ? (result += `>>>>> ${openForm.companyName} <<<<<\n\n`)
      : (result += `>>>>> *${openForm.companyName} Off-Campus* <<<<<\n\n`);
  }
  //category if on-campus
  if (initForm.type === "On-Campus") {
    if (openForm.slab === "Internship") {
      result += "Category: Internship\n";
    } else {
      switch (openForm.slab) {
        case "DIT":
          result += "Category: Dream IT";
          break;
        case "ODC":
          result += "Category: Open Dream Core";
          break;
        case "DC":
          result += "Category: Dream Core";
          break;
        case "OD":
          result += "Category: Open Dream";
          break;
        case "GOD":
          result += "Category: Golden Open Dream";
          break;
      }
    }
    {
      openForm.hasInternship ? (result += " + Internship\n") : null;
    }
  }
  //single profile
  if (openForm.profiles.length === 1) {
    if (initForm.type === "On-Campus") {
      if (openForm.slab === "Internship") {
        result += "Internship ";
      } else {
        result += "Job ";
      }
      result += `Profile: ${openForm.profiles[0]}\n`;
    } else {
      if (openForm.slab === "Internship") {
        result += "*Internship ";
      } else {
        result += "*Job ";
      }
      result += `Profile:* ${openForm.profiles[0]}\n`;
    } //multi-profile
  } else {
    if (initForm.type === "On-Campus") {
      if (openForm.slab === "Internship") {
        result += "Internship ";
      } else {
        result += "Job ";
      }
      result += `Profiles:\n`;
    } else {
      if (openForm.slab === "Internship") {
        result += "*Internship ";
      } else {
        result += "*Job ";
      }
      result += `Profiles:*\n`;
    }
    openForm.profiles.map((profile, index) => {
      result += `${index + 1}. ${profile}\n`;

      if (openForm.checkDepentent.branch && openForm.branches[index]) {
        if (initForm.type === "On-Campus") {
          if (initForm.course === "BTech") {
            result += "-> Eligible Branch";
            result += openForm.branches[index].length > 1 ? "es: " : ": ";
          } else if (
            initForm.course === "MTech" &&
            openForm.branches[index].length === 1 &&
            openForm.branches[index][0] === "ECE"
          ) {
            result += "-> Eligible Branch: ";
          } else {
            result += "-> Eligible Branches: All sub-branches of ";
          }
        } else {
          if (initForm.course === "BTech") {
            result += "-> *Eligible Branch:* ";
            result += openForm.branches[index].length > 1 ? "es:* " : ":* ";
          } else if (
            initForm.course === "MTech" &&
            openForm.branches[index].length === 1 &&
            openForm.branches[index][0] === "ECE"
          ) {
            result += "-> *Eligible Branch:* ";
          } else {
            result += "-> *Eligible Branches:* All sub-branches of ";
          }
        }

        const arr = openForm.branches[index];
        if (arr.length > 1) {
          result += `${arr.slice(0, -1).join(", ")} and ${arr[arr.length - 1]}`;
        } else if (arr.length === 1) {
          result += `${arr[0]}`;
        } else {
          result += "Not specified";
        }

        result += "\n";
      }
      if (openForm.checkDepentent.stipend) {
        if (openForm.slab === "Internship" || openForm.hasInternship) {
          initForm.type === "On-Campus"
            ? (result += `-> Stipend: `)
            : (result += `-> *Stipend:* `);
          result += `${openForm.stipends[index]}/month\n`;
        }
      }
      if (openForm.checkDepentent.ctc) {
        if (openForm.slab !== "Internship" || openForm.hasFTE) {
          initForm.type === "On-Campus"
            ? (result += `-> CTC Offered: `)
            : (result += `-> *CTC Offered:* `);
          result += `${openForm.ctcs[index]} LPA\n`;
        }
      }
      if (openForm.checkDepentent.durations) {
        if (openForm.slab === "Internship" || openForm.hasInternship) {
          initForm.type === "On-Campus"
            ? (result += `-> Internship Duration: `)
            : (result += `-> *Internship Duration:* `);
          result += `${openForm.durations[index]} months\n`;
        }
      }
      if (openForm.checkDepentent.location) {
        if (openForm.slab === "Internship") {
          initForm.type === "On-Campus"
            ? (result += `-> Internship Location: `)
            : (result += `-> *Internship Location:* `);
          result += `${openForm.locations[index]}\n`;
        } else {
          initForm.type === "On-Campus"
            ? (result += `-> Job Location: `)
            : (result += `-> *Job Location:* `);
          result += `${openForm.locations[index]}\n`;
        }
      }
    });
  }

  //Eligible Branches
  if (!openForm.checkDepentent.branch) {
    if (initForm.type === "On-Campus") {
      if (initForm.course === "BTech") {
        result += "Eligible Branch";
        if (openForm.branches[0].length > 1) result += "es: ";
        else result += ": ";
      } else if (
        initForm.course === "MTech" &&
        openForm.branches[0].length === 1 &&
        openForm.branches[0][0] === "ECE"
      ) {
        result += "-> Eligible Branch: ";
      } else {
        result += "Eligible Branches: All sub-branches of ";
      }
    } else {
      if (initForm.course === "BTech") {
        result += "*Eligible Branch";
        if (openForm.branches[0].length > 1) result += "es:* ";
        else result += ":* ";
      } else if (
        initForm.course === "MTech" &&
        openForm.branches[0].length === 1 &&
        openForm.branches[0][0] === "ECE"
      ) {
        result += "-> *Eligible Branch:* ";
      } else {
        result += "*Eligible Branches:* All sub-branches of ";
      }
    }
    if (openForm.branches[0].length > 1) {
      result += `${openForm.branches[0].slice(0, -1).join(", ")} and ${
        openForm.branches[0][openForm.branches[0].length - 1]
      }`;
    } else {
      result += `${openForm.branches[0][0]}`;
    }
    result += "\n";
  }

  //Eligibility Criteria

  if (initForm.type === "On-Campus") {
    result += "Eligibility Criteria: ";
  } else {
    result += "*Eligible Criteria:* ";
  }

  if (openForm.tenth[0] === openForm.twelfth[0]) {
    result += `${openForm.tenth[0]}% in 10th, 12th and `;
  } else {
    result += `${openForm.tenth[0]}% in 10th, ${openForm.twelfth[0]}% in 12th and `;
  }

  if (initForm.course === "BTech") {
    result += `${openForm.btech[0]} CGPA in BTech (`;
  } else {
    result += `${openForm.btech[0]} CGPA in BTech, MTech (`;
  }

  if (openForm.activeBacklog === 0) {
    if (openForm.isDeadBacklogAllowed) {
      result += "No active backlogs allowed)\n";
    } else {
      result += "No active/dead backlogs allowed)\n";
    }
  } else if (openForm.activeBacklog === 1) {
    result += "1 active backlog allowed)\n";
  } else {
    result += `${openForm.activeBacklog} active backlogs allowed)\n`;
  }
  // Stipend
  if (!openForm.checkDepentent.stipend) {
    if (openForm.slab === "Internship" || openForm.hasInternship) {
      initForm.type === "On-Campus"
        ? (result += `Stipend: `)
        : (result += `*Stipend:* `);
      result += `${openForm.stipends[0]}/month\n`;
    }
  }

  // CTC Offered
  if (!openForm.checkDepentent.ctc) {
    if (openForm.slab !== "Internship" || openForm.hasFTE) {
      initForm.type === "On-Campus"
        ? (result += `CTC Offered: `)
        : (result += `*CTC Offered:* `);
      result += `${openForm.ctcs[0]} LPA\n`;
    }
  }
  //Internship Duration
  if (!openForm.checkDepentent.durations) {
    if (openForm.slab === "Internship" || openForm.hasInternship) {
      initForm.type === "On-Campus"
        ? (result += `Internship Duration: `)
        : (result += `*Internship Duration:* `);
      result += `${openForm.durations[0]} months\n`;
    }
  }
  //Internship Location/Job Location
  if (!openForm.checkDepentent.location) {
    if (openForm.slab === "Internship") {
      initForm.type === "On-Campus"
        ? (result += `Internship Location: `)
        : (result += `*Internship Location:* `);
      result += `${openForm.locations[0]}\n`;
    } else {
      initForm.type === "On-Campus"
        ? (result += `Job Location: `)
        : (result += `*Job Location:* `);
      result += `${openForm.locations[0]}\n`;
    }
  }

  //expected date of joining
  if (openForm.expectedDateOfJoining) {
    initForm.type === "On-Campus"
      ? (result += `Expected Date of Joining: `)
      : (result += `*Expected Date of Joining:* `);
    result += formatWithLabel(openForm.expectedDateOfJoining);
    result += "\n";
  }

  if (openForm.deadlineForRegistration) {
    initForm.type === "On-Campus"
      ? (result += `Deadline for Registration: `)
      : (result += `*Deadline for Registration:* `);
    result += formatWithLabel(openForm.deadlineForRegistration, true);
    result += "\n";
  }

  return result;
};
export default OpenGenerator;
