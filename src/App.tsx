import { useState, useEffect } from "react";
import { AddNote, Header, NoteItem, Top } from "./components";
import { NotesProvider } from "./contexts";

interface NotesT {
  id: number;
  title: string;
  content: string;
  bgColor: string;
  label: string[];
}

function App() {
  const [notes, setNotes] = useState<NotesT[]>([]);
  const [currentLabel, setCurrentLabel] = useState<string>("All");
  const [toBeSeached, setToBeSeached] = useState("")

  const addNote = (note: NotesT) => {
    setNotes((prev) => [note, ...prev]);
  };

  const updateNote = (id: number, note: NotesT) => {
    setNotes((prev) =>
      prev.map((prevNote) => (prevNote.id === id ? note : prevNote))
    );
  };

  const deleteNote = (id: number) => {
    setNotes((prev: NotesT[]) => prev.filter((note: NotesT) => note.id != id));
  };

  useEffect(() => {
    const prevNotes: string = localStorage.getItem("Notes") ?? "";

    if (prevNotes && prevNotes.length > 0) {
      const jsonNotes = JSON.parse(prevNotes);
      setNotes(jsonNotes);
    }
  }, []);

  useEffect(() => {
    if (notes && notes.length > 0)
      localStorage.setItem("Notes", JSON.stringify(notes));
  }, [notes]);

  const setLabelFilterFunc = (label: string) => {
    setCurrentLabel(label);
  };

  return (
    <NotesProvider
      value={{ notes, addNote, updateNote, deleteNote, setLabelFilterFunc }}
    >
      <Header />
      <Top setToBeSeached={setToBeSeached} />
      <AddNote />
      {notes.length < 1 && (
        <h1 className="text-center font-bold text-3xl mt-10 text-black/20 dark:text-white/20">
          You don’t have any notes
        </h1>
      )}
      <div className="h-full w-full  grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 p-5 sm:p-10 lg:px-16">
        {notes.map(
          (note) =>
            note.label.includes(currentLabel) && 
              note.title.toLowerCase().includes(toBeSeached.toLowerCase()) && (
              <NoteItem key={note.id} noteData={note} />
            )
        )}
      </div>
    </NotesProvider>
  );
}

export default App;
