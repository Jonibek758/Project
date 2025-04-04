import { NotesProvider } from "./context/NotesContext";
import Head from "./components/Head";
import Search from "./components/Search";
import Textmain from "./components/Textmain";

export default function App() {
  return (
    <NotesProvider>
      <div className="app">
        <Head />
        <Search />
        <Textmain />
      </div>
    </NotesProvider>
  );
}
