import './copy.css'

const CopyButton = ({ broadcast }) => {
  const handleCopy = () => {
    if (navigator.clipboard && broadcast) {
      navigator.clipboard
        .writeText(broadcast)
        .then(() => alert("Copied to clipboard!"))
        .catch((err) => console.error("Copy failed: ", err));
    } else {
      alert("Nothing to copy!");
    }
  };

  return (
    <div className="copy-button-container">
      <div className="copy-button" onClick={handleCopy}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="copy-svg"
          width="20"
          height="20"
          fill="none"
          stroke="white"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      </div>
    </div>
  );
};

export default CopyButton;
