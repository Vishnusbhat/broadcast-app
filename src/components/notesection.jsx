import React, { useState, useEffect, useRef } from "react";

import "./notesection.css";

const NoteSection = ({
  filename = "default.txt",
  notes,
  setNotes,
  initForm,
  openForm,
}) => {
  const [restoreNotes, setRestoreNotes] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [newNote, setNewNote] = useState("");
  const [showRestore, setShowRestore] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const editDivRef = useRef(null);

  useEffect(() => {
    fetch(`/notes/${filename}`)
      .then((res) => res.text())
      .then((data) => {
        const usualNotes = data
          .split("\n")
          .filter(
            (line) =>
              line.trim() !== "" && !/^\[([^\]:]+):?(\d*)\]\s*(.+)$/.test(line)
          );
        setNotes(usualNotes);
      });
  }, [filename]);

  useEffect(() => {
    if (initForm.category === "Open") {
      appendNotes(initForm.type);
    }
  }, [initForm.type]);

  useEffect(() => {
    if (initForm.category === "Open" && openForm.profiles.length > 1) {
      if (openForm.hasProfileChoice) appendNotes("Choice-Multiprofile");
      else appendNotes("No-Choice-Multiprofile");
    }
  }, [openForm.hasProfileChoice]);

  useEffect(() => {
    if (initForm.category === "Open") appendNotes(initForm.course);
  }, [initForm.course]);

  useEffect(() => {
    if (initForm.category === "Open" && openForm.slab === "Internship")
      if (openForm.hasFTE)
        if (!openForm.hasCTC) appendNotes("HasPBCnoCTC");
        else appendNotes("HasPBChasCTC");
  }, [openForm.slab, openForm.hasFTE, openForm.hasCTC]);

  const appendNotes = (label) => {
    fetch(`/notes/${filename}`)
      .then((res) => res.text())
      .then((data) => {
        const lines = data.split("\n").map((line) => line.trim());

        const extracted = lines
          .map((line) => {
            const match = line.match(/^\[([^\]:]+):?(\d*)\]\s*(.+)$/);
            if (match && match[1] === label) {
              const index = match[2] !== "" ? parseInt(match[2], 10) : null;
              return { text: match[3], index };
            }
            return null;
          })
          .filter((entry) => entry !== null);

        console.log("Appending notes from label:", label);
        console.log("Extracted notes with positions:", extracted);

        setNotes((prev) => {
          const notes = [...prev];

          extracted.forEach(({ text, index }) => {
            if (!notes.includes(text)) {
              if (index !== null && index >= 0 && index <= notes.length) {
                notes.splice(index, 0, text);
              } else {
                notes.push(text);
              }
            }
          });

          return notes;
        });
      });
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, newNote.trim()]);
      setNewNote("");
    }
  };
  const deleteNote = (index) => {
    const deletedNote = notes[index];
    setNotes((prevNotes) => {
      const updatedNotes = [...prevNotes];
      updatedNotes.splice(index, 1);
      return updatedNotes;
    });
    setRestoreNotes((prevRestore) => {
      if (!prevRestore.includes(deletedNote)) {
        return [...prevRestore, deletedNote];
      }
      return prevRestore;
    });
  };
  const restoreNote = (index) => {
    const restored = restoreNotes[index];
    setRestoreNotes((prev) => {
      const restore = [...prev];
      restore.splice(index, 1);
      return restore;
    });
    setNotes((prev) => {
      const notes = [...prev];
      notes.push(restored);
      return notes;
    });
  };

  useEffect(() => {
    if (editDivRef.current && editIndex !== null) {
      editDivRef.current.focus();
    }
  }, [editIndex]);

  const handleDragStart = (index) => setDraggedIndex(index);

  const handleDrop = (index) => {
    const updated = [...notes];
    const [movedNote] = updated.splice(draggedIndex, 1);
    updated.splice(index, 0, movedNote);
    setNotes(updated);
  };

  const handleShowRestore = () => {
    setShowRestore(!showRestore);
  };

  const handleEditStart = (index) => {
    setEditIndex(index);
  };

  const handleEditSave = (index) => {
    if (editDivRef.current) {
      const updatedNotes = [...notes];
      updatedNotes[index] = editDivRef.current.innerText;
      setNotes(updatedNotes);
    }
    setEditIndex(null);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleEditSave(index);
    }
  };

  useEffect(() => {
    console.log("Show Restore Notes: ", restoreNotes);
    if (restoreNotes.length === 0) setShowRestore(false);
  }, [restoreNotes]);

  useEffect(() => {
    console.log("Updated showRestore:", showRestore);
  }, [showRestore]);

  return (
    <div className="note-container">
      <div className="note-heading">Notes</div>
      <div className="note-list">
        {notes.map((note, index) => (
          <div
            key={index}
            className="note-item"
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(index)}
          >
            {editIndex === index ? (
              <div
                contentEditable
                ref={editDivRef}
                className="edit-div"
                onBlur={() => handleEditSave(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                suppressContentEditableWarning={true}
              >
                {notes[index]}
              </div>
            ) : (
              <div onDoubleClick={() => handleEditStart(index)}>{note}</div>
            )}

            <div className="cross-button" onClick={() => deleteNote(index)}>
              <svg
                className="close-svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
              >
                <path d="M18 6L6 18M6 6l12 12" stroke="black" strokeWidth="3" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      <div className="add-note">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add a new note..."
        />
        <button onClick={handleAddNote}>Add</button>
      </div>
      <div className={`recycle-bin ${showRestore ? "recycle-bin-open" : ""}`}>
        <div className="restore-button" onClick={handleShowRestore}>
          Restore Notes
        </div>
        <div className="note-list">
          {restoreNotes.map((note, index) => (
            <div
              key={index}
              className="restore-note-item"
              onClick={() => {
                restoreNote(index);
              }}
            >
              {note}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoteSection;
