import { useState } from "react";
import "./Note.css";

const Note = ({ note, onNoteUpdate, onNoteDelete }) => {
  const [isFocused, setIsFocused] = useState(false);
  const noteTextUpdated = (event) => {
    setIsFocused(false);
    const newTextValue = event.currentTarget.textContent;
    const updatedNote = {
      ...note,
      text: newTextValue,
    };
    onNoteUpdate(updatedNote);
  };

  return (
    <div className={isFocused ? "note note--focused" : "note"}>
      <button type="button" className="btn-close" aria-label="Close" onClick={() => {onNoteDelete(note)}}></button>
      <div
        onBlur={noteTextUpdated}
        onFocus={() => {
          setIsFocused(true);
        }}
        contentEditable={true}
        suppressContentEditableWarning={true}
        className="note__text"
      >
        {note.text}
      </div>
      <div className="note__link">
        <a href={note.link} target="_blank">
          {note.link}
        </a>
      </div>
    </div>
  );
};

export default Note;
