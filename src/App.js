import { useEffect, useState } from "react";
import "./App.css";
import Note from "./Components/Note/Note";
import { createNote, deleteNote, getNotes, updateNote } from "./services/notesService";
import { Button, Modal, FloatingLabel, Form } from "react-bootstrap";

function App() {
  const [notesList, setNotesList] = useState([]);
  const [showAddNote, setShowAddNote] = useState(false);
  const [newValue, setNewValue] = useState({ text: "", link: "" });

  const handleCloseAddNote = () => {
    setNewValue({text: "", link: ""})
    setShowAddNote(false)};
  const handleShowAddNote = () => setShowAddNote(true);

  useEffect(() => {
    getNotesFromBackend();
  }, []);

  const getNotesFromBackend = async () => {
    const notes = await getNotes();
    setNotesList(notes);
  };

  const addNote = async () => {
    const savedNote = await createNote(newValue);
    setNotesList([savedNote , ...notesList])
    handleCloseAddNote();
  };

  const deleteNoteItem = async (noteToDelete) => {
    await deleteNote(noteToDelete._id)
    const remainingNotes = notesList.filter((noteItem) => {
      return noteItem._id !== noteToDelete._id;
    });
    setNotesList(remainingNotes);
  }

  const updateNoteItem = async(text) => {
    const noteFromServer = await updateNote(text);
    const updatedList = notesList.map((noteItem) => {
      if (noteItem._id === noteFromServer._id) {
        return text;
      }
      return noteItem;
    });
    setNotesList(updatedList);
  };

  

  return (
    <div className="App">
      <Button variant="dark" className="add-button" onClick={handleShowAddNote}>
        <div className="add-button-text">+</div>
      </Button>

      <Modal show={showAddNote} onHide={handleCloseAddNote}>
        <Modal.Header closeButton>
          <Modal.Title>ADD NOTE</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FloatingLabel controlId="floatingTextarea2" label="Text">
            <Form.Control
              type="textarea"
              placeholder="Text"
              style={{ height: "100px" }}
              onChange={(e) => {
                const newVal = e.currentTarget.value;
                setNewValue({ ...newValue, text: newVal });
              }}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingTextarea"
            label="Link"
            className="mb-3 mt-3"
          >
            <Form.Control
              type="URL"
              placeholder="Link"
              onChange={(e) => {
                const newVal = e.currentTarget.value;
                setNewValue({ ...newValue, link: newVal });
              }}
            />
          </FloatingLabel>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddNote}>
            Close
          </Button>

          <Button variant="primary" onClick={addNote}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="notes-list">
        {notesList?.map((noteItem, index) => {
          return (
            <Note note={noteItem} onNoteUpdate={updateNoteItem} onNoteDelete={deleteNoteItem} key={index} />
          );
        })}
      </div>
    </div>
  );
}

export default App;
