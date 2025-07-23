const CopyButton = ({ broadcast }) => {
  const handleCopy = () => {
    if (navigator.clipboard && broadcast) {
      navigator.clipboard.writeText(broadcast)
        .then(() => alert("Copied to clipboard!"))
        .catch((err) => console.error("Copy failed: ", err));
    } else {
      alert("Nothing to copy!");
    }
  };

  return (
    <button onClick={handleCopy}>
      Copy to Clipboard
    </button>
  );
};

export default CopyButton;
