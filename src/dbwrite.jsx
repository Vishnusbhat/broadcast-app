import "./dbwrite.css";

import {
  modifyDeadline,
  getDeadline,
  fetchCurrentDBState,
} from "./utils/deadline";
import { toast } from "react-toastify";

const DBButton = ({ setOpenForm }) => {
  const handleClick = () => {
    setOpenForm((prev) => {
      const p = { ...prev };
      const isolated = getDeadline(Date.now());
      const current_state = fetchCurrentDBState();
      const finalDeadline = modifyDeadline(isolated, p.branches, current_state);
      toast.info("Deadline is " + new Date(finalDeadline));
      p.deadlineForRegistration = finalDeadline;
      return p;
    });
  };

  return (
    <div className="db-button" onClick={handleClick}>
      <svg viewBox="0 0 512 512" fill="white" width={24} height={24}>
        <path d="M173.9 439.4L7 272.5c-9.4-9.4-9.4-24.6 0-33.9l33.9-33.9c9.4-9.4 24.6-9.4 33.9 0l99.1 99.1L437.3 72.4c9.4-9.4 24.6-9.4 33.9 0l33.9 33.9c9.4 9.4 9.4 24.6 0 33.9L207.8 439.4c-9.4 9.4-24.6 9.4-33.9 0z" />
      </svg>
    </div>
  );
};

export default DBButton;
