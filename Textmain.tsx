import { useContext, useState } from "react";
import { NotesContext } from "../context/NotesContext";
import { MdDeleteForever } from "react-icons/md";
import { FaTelegram } from "react-icons/fa6";

export default function Textmain() {
  const notesContext = useContext(NotesContext);
  if (!notesContext) return null;

  const { notes, addNote, deleteNote, searchText } = notesContext;
  const [newNote, setNewNote] = useState("");

  function handleAddNote() {
    if (newNote.trim()) {
      addNote(newNote);
      setNewNote("");
    }
  }

  return (
    <div className="notes-container">
      {notes
        .filter((note) => note.text.toLowerCase().includes(searchText.toLowerCase())).map((note) => ( 
           <div key={note.id} className="note">    
           <p>{note.text}</p>    
           <span>{note.date}</span>    
           <button onClick={() => deleteNote(note.id)}><MdDeleteForever className="color" size={45} /></button>  
           </div>
          ))}
      
      <div className="new-note">
        <textarea
          placeholder="Type to add a note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <FaTelegram onClick={handleAddNote} size={35} />
      </div>
    </div>
  );
}
