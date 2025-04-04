import { useContext } from "react";
import { NotesContext } from "../context/NotesContext";

export default function Search() {
  const notesContext = useContext(NotesContext);
  if (!notesContext) return null;

  const { searchText, setSearchText } = notesContext;

  return (
    <div className="search">
      <input
        type="search"
        placeholder="type to search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );
}
