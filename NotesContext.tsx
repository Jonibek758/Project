import { createContext, useState, ReactNode } from "react";

interface Note {
  id: number;
  text: string;
  date: string;
}

interface NotesContextType {
  notes: Note[];
  addNote: (text: string) => void;
  deleteNote: (id: number) => void;
  searchText: string;
  setSearchText: (text: string) => void;
}

export const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([
    { id: 1, text: "This is my first note", date: "06/05/2021" },
    { id: 2, text: "Pick up the groceries", date: "06/05/2021" },
  ]);
  const [searchText, setSearchText] = useState<string>("");

  function addNote(text: string) {
    const newNote: Note = {
      id: Date.now(),
      text,
      date: new Date().toLocaleDateString(),
    };
    setNotes([...notes, newNote]);
  }

  function deleteNote(id: number) {
    setNotes(notes.filter((note) => note.id !== id));
  }

  return (
    <NotesContext.Provider value={{ notes, addNote, deleteNote, searchText, setSearchText }}>
      {children}
    </NotesContext.Provider>
  );
}
