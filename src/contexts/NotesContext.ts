import { createContext, useContext } from "react";

interface NotesT {
  id: number;
  title: string;
  content: string;
  bgColor: string;
  label: string[];
}

interface NotesContextT {
  notes: NotesT[];
  addNote: (note: NotesT) => void;
  updateNote: (id: number, note: NotesT) => void;
  deleteNote: (id: number) => void;
  setLabelFilterFunc: (label:string) => void;
}

export const NotesContext = createContext<NotesContextT>({
  notes: [
    {
      id: 1234,
      title: "This",
      content: "this is content gi",
      bgColor: "bg-blue-400",
      label: ["All","lab1"],
    },
  ],
    // @ts-ignore
  addNote: (note) => {}, 
   // @ts-ignore
  updateNote: (id, note) => {},
    // @ts-ignore
  deleteNote: (id) => {},
  // @ts-ignore
  setLabelFilterFunc: (label) => {},
});   

export const useNotesContext = (): NotesContextT => {
  return useContext(NotesContext);
};

export const NotesProvider = NotesContext.Provider;
