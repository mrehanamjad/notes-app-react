import React, { useState} from "react";
import { FaPenSquare, MdDelete } from "../icons";
import { useNotesContext } from "../contexts";
import {BgColor,Label} from "./index";

interface NotesT {
  id: number;
  title: string;
  content: string;
  bgColor: string;
  label: string[];
}

interface NoteItemProp {
  noteData: NotesT;
}

const NoteItem: React.FC<NoteItemProp> = ({ noteData }) => {
  const [expend, setExpend] = useState<boolean>(false);
  const [title, setTitle] = useState(noteData.title);
  const [content, setContent] = useState(noteData.content);

  const { updateNote, deleteNote } = useNotesContext();
  const [label, setLabel] = useState<string>(noteData.label[1]);

// @ts-ignore: Suppressing unused variable warning
  const update = (e) => {
    e.preventDefault();
    updateNote(noteData.id, {
      ...noteData,
      title,
      content,
      label: ["All", label],
    });
    setExpend(false);
  };

  const del = () => {
    deleteNote(noteData.id);
  };

  return (
    <div
      onClick={(e) => {
        if (expend) {
          e.stopPropagation();
          update(e);
        }
      }}
      className={`${
        expend
          ? "h-full w-full bg-black/40  fixed z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center"
          : ""
      }`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          setExpend(true);
        }}
        className={`${
          expend
            ? " m-0 z-30  min-h-[62%] min-w-[90%] md:min-w-[75%] xl:min-w-[55%] sm:rounded-lg"
            : "hover:border-4 h-48"
        }  p-4 dark:text-white rounded-lg flex flex-col gap-1 cursor-pointer bg-cover transition-all ease-linear ${
          noteData.bgColor
        }`}
      >
        <form
          action=""
          className="h-full w-full flex flex-col gap-1"
          onSubmit={update}
        >
          {expend && (
            <div className="w-full h-full mb-2 flex justify-between text-3xl text-white font-bold"></div>
          )}
          <input
            type="text"
            className={`w-full p-1 outline-none ${
              !expend
                ? "overflow-hidden bg-transparent cursor-pointer"
                : "bg-transparent min-h-[10%]"
            } font-bold text-lg `}
            placeholder="TiTle."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            name="content"
            id=""
            rows={10}
            placeholder="Take a note.."
            className={`resize-none h-full outline-none p-1 font-medium ${
              !expend
                ? "overflow-hidden bg-transparent  cursor-pointer"
                : "bg-transparent "
            }`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <div className="w-full flex flex-row-reverse">
            {!expend && (
              <FaPenSquare className="text-2xl hover:text-white cursor-pointer" />
            )}
            {expend && (
              <div className="w-full flex justify-between">
                <ul className="p-2 flex justify-around dark:text-white rounded-md relative">
                  <li>
                    <BgColor note={noteData} />
                  </li>
                  <li>
                    <Label setLabel={setLabel} label={label} />
                  </li>
                </ul>
                <button title="Delete note" onClick={del}>
                  <MdDelete className="P-2 text-2xl dark:text-white hover:text-red-600" />
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteItem;
