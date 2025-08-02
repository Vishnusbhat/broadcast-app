import "./preview.css";
const Preview = ({ initForm, openForm, resultForm, broadcast }) => {
  return (
    <div className="preview-container">
      <h2>Preview</h2>
      <pre>
        Broadcast: <br />
        {broadcast}
      </pre>
      <p>Is dependent: {openForm.isDependent ? "Yes" : "No"}</p>
      <p>Type: {initForm.type}</p>
      <p>Course: {initForm.course}</p>
      <p>Category: {initForm.category}</p>
      <h3>Open Form Details</h3>
      <p>Company Name: {openForm.companyName}</p>
      <p>Slab: {openForm.slab}</p>
      <p>Has Internship: {openForm.hasInternship ? "Yes" : "No"}</p>
      <p>Has FTE: {openForm.hasFTE ? "Yes" : "No"}</p>
      <p>Profiles: {openForm.profiles.join(", ")}</p>
      <p>Stipends: {openForm.stipends.join(", ")}</p>
      <p>
        Branches:{" "}
        {openForm.branches.map((branch) => branch.join(", ")).join("; ")}
      </p>
      <p>CTCs: {openForm.ctcs.join(", ")}</p>
      <p>Locations: {openForm.locations.join(", ")}</p>
      <p>Tenth: {openForm.tenth.join(", ")}</p>
      <p>Twelfth: {openForm.twelfth.join(", ")}</p>
      <p>BTech: {openForm.btech.join(", ")}</p>
      <p>MTech: {openForm.mtech.join(", ")}</p>
      <p>Active Backlogs: {openForm.activeBacklog}</p>
      <p>
        Is deadbacklog allowed? {openForm.isDeadBacklogAllowed ? "yes" : "no"}
      </p>
      <h4>Dependent Checks</h4>
      <p>Stipend: {openForm.checkDepentent.stipend ? "Yes" : "No"}</p>
      <p>CTC: {openForm.checkDepentent.ctc ? "Yes" : "No"}</p>
      <p>Location: {openForm.checkDepentent.location ? "Yes" : "No"}</p>
      <p>Criteria: {openForm.checkDepentent.criteria ? "Yes" : "No"}</p>
      <p>Branch: {openForm.checkDepentent.branch ? "Yes" : "No"}</p>
      <p>Duration: {openForm.checkDepentent.durations ? "Yes" : "No"}</p>
      <p>Durations: {openForm.durations.join(", ")}</p>
      <h3>Result Form</h3>
      <p>Students: {resultForm.students.join(", ")}</p>
      <p>Result: {resultForm.result ? "Yes" : "No"}</p>
      <p>Expected DoJ: {openForm.expectedDateOfJoining?.toLocaleString()}</p>
    </div>
  );
};

export default Preview;
