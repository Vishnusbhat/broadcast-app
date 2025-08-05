import './copy.css'
import { modifyDeadline, getDeadline, fetchCurrentDBState } from './components/utils/deadline';
import { toast } from 'react-toastify';

const CopyButton = ({ broadcast, setOpenForm }) => {
  const handleCopy = () => {
    if (navigator.clipboard && broadcast) {
      setOpenForm((prev) => {
            const p = { ...prev };
            const isolated = getDeadline(Date.now());
            const current_state = fetchCurrentDBState();
            const finalDeadline = modifyDeadline(
              isolated,
              p.branches,
              current_state
            );
      
            p.deadlineForRegistration = finalDeadline;
            return p;
          });
      navigator.clipboard
        .writeText(broadcast)
        .then(() => toast.success("Copied to clipboard!"))
        .catch((err) => console.error("Copy failed: ", err));
    } else {
      toast.info("Nothing to copy!");
    }
  };

  return (
    // <div className="copy-button-container-1">
      <div className="copy-button" onClick={handleCopy}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="copy-svg"
          width="32"
          height="32"
          fill="none"
          stroke="white"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      </div>
    // </div>
  );
};

export default CopyButton;
