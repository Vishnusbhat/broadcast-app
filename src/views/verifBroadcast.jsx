import "./verifBroadcast.css";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
import { db } from "../firebase";

const VerifBroadcast = ({ id }) => {
  const [broadcast, setBroadcast] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const vbCanvasRef = useRef(null);
  const lastTapRef = useRef(0);

  const preventContextMenu = (e) => {
  if (editMode) {
    e.preventDefault();
  }
};

  // Firestore document listener
  useEffect(() => {
    if (!id) return;

    const docRef = doc(db, "broadcasts", id);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const lines = data.broadcast ? data.broadcast.split("\n") : [];
        setBroadcast({ id: docSnap.id, ...data, lines });
      } else {
        setBroadcast(null);
      }
    });

    return () => unsubscribe();
  }, [id]);

  // Double tap detection (300ms window) to toggle edit mode on touch devices
  const handleTouchEnd = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      setEditMode((prev) => !prev);
      console.log("Edit mode toggled:", !editMode);
      // Clear selection on mode toggle for clarity
      if (window.getSelection) window.getSelection().removeAllRanges();
    }
    lastTapRef.current = now;
  };

  // Handle text selection only when in edit mode
  const handleSelection = () => {
    if (!editMode) return;
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    const selectedText = selection.toString();
    if (!vbCanvasRef.current) return;
    const container = vbCanvasRef.current;

    // Helper to get absolute offset within container text nodes
    function getAbsoluteOffset(node, offset) {
      let chars = 0;
      function traverse(n) {
        if (n === node) {
          chars += offset;
          throw chars; // early exit
        }
        if (n.nodeType === Node.TEXT_NODE) {
          chars += n.textContent.length;
        } else {
          for (let i = 0; i < n.childNodes.length; i++) {
            traverse(n.childNodes[i]);
          }
        }
      }
      try {
        traverse(container);
      } catch (count) {
        return count;
      }
      return 0;
    }

    try {
      const anchorNode = selection.anchorNode;
      const anchorOffset = selection.anchorOffset;
      const focusNode = selection.focusNode;
      const focusOffset = selection.focusOffset;

      const startOffset = getAbsoluteOffset(anchorNode, anchorOffset);
      const endOffset = getAbsoluteOffset(focusNode, focusOffset);

      const selectionStart = Math.min(startOffset, endOffset);
      const selectionEnd = Math.max(startOffset, endOffset);

      function getLineAndOffset(pos) {
        let charCount = 0;
        for (let i = 0; i < broadcast.lines.length; i++) {
          const lineLength = broadcast.lines[i].length + 1; // +1 for '\n'
          if (pos < charCount + lineLength) {
            return { line: i, offset: pos - charCount };
          }
          charCount += lineLength;
        }
        return {
          line: broadcast.lines.length - 1,
          offset: broadcast.lines[broadcast.lines.length - 1].length,
        };
      }

      const startPos = getLineAndOffset(selectionStart);
      const endPos = getLineAndOffset(selectionEnd);

      console.log("Selection start:", startPos);
      console.log("Selection end:", endPos);
      console.log("Selected text:", selectedText);

      if (selectedText.includes("\n")) {
        alert("Multi-line selection is not allowed.");
        selection.removeAllRanges();
      }

      // Here you can trigger your comment UI with these positions

    } catch (err) {
      console.error("Error processing selection:", err);
    }
  };

  // Register selectionchange listener to handle text selection cross-platform
  useEffect(() => {
    const onSelectionChange = () => {
      setTimeout(() => {
        handleSelection();
      }, 50);
    };
    document.addEventListener("selectionchange", onSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", onSelectionChange);
    };
  }, [editMode, broadcast]); // update listener if edit mode or broadcast changes

  return (
    <div className="my-broadcasts-container">
      <div className="my-broadcasts-heading-container">
        <div className="my-broadcasts-text">
          <div className="my-broadcasts-name">
            {/* Hello {userName}! */}
            <div className="my-broadcasts-profile-container">
              <div className="my-broadcasts-profile"></div>
            </div>
          </div>
          <span className="my-broadcasts-label">
            Broadcast Verification Workspace
          </span>
          <div style={{marginTop:'8px', fontWeight:'bold'}}>
            Mode: {editMode ? "Comment/Edit" : "View"}
          </div>
        </div>
      </div>
      <div className="vb-canvas-container">
        <div
          id="vb-canvas"
          className="vb-canvas"
          ref={vbCanvasRef}
          onTouchEnd={handleTouchEnd}
            onContextMenu={preventContextMenu}
          style={{
            whiteSpace: "pre-wrap",
            userSelect: editMode ? "text" : "none",
            cursor: editMode ? "text" : "default",
          }}
        >
          {broadcast?.broadcast || ""}
        </div>
      </div>
    </div>
  );
};

export default VerifBroadcast;
