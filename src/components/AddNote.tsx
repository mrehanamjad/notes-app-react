import React, { useState} from "react";
import { useNotesContext } from "../contexts";
import { IoIosAddCircle } from "../icons";
import BgColor from "./BgColor";
import Label from "./Label";

const AddNote: React.FC = () => {
  const [letsAdd, setLetsAdd] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [bgColor, setBgColor] = useState<string>(
    "bg-[#f8f9fa]  dark:bg-[#1e293b]"
  );
  const [label, setLabel] = useState<string>("");

  const { addNote } = useNotesContext();

  const add = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title) return;

    addNote({
      id: Date.now(),
      title,
      content,
      bgColor,
      label: ["All", label],
    });
    setTitle("");
    setContent("");
    setLetsAdd(false);
  };

  return (
    <>
      {letsAdd ? (
        <div
          className={`${
            letsAdd &&
            "h-full w-full bg-black/40 fixed z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center"
          }`}
        >
          <div
            className={`min-h-[62%] min-w-[90%] md:min-w-[75%] xl:min-w-[55%] rounded-md  m-0 z-30   p-4 flex flex-col gap-1 cursor-pointer bg-cover transition-all ease-linear ${bgColor}`}
          >
            <form
              action=""
              className="h-full w-full flex flex-col gap-1"
              onSubmit={add}
            >
              <div className="w-full mb-2 flex justify-between text-3xl text-white font-bold"></div>
              <input
                type="text"
                className={`w-full p-1 outline-none bg-black/5 font-bold text-lg dark:text-white `}
                placeholder="TiTle."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <textarea
                name="content"
                id=""
                rows={10}
                placeholder="Take a note.."
                className="resize-none  h-full dark:text-white  p-1 outline-none font-medium bg-black/5"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
              <div className="w-full flex justify-between items-center flex-col sm:flex-row">
                <ul className="p-2 flex justify-around  dark:text-white rounded-md relative">
                  <li>
                    <BgColor setBg={setBgColor} />
                  </li>
                  <li>
                    <Label setLabel={setLabel} label={label} />
                  </li>
                </ul>
                <div>
                  <button
                    onClick={() => {
                      setLetsAdd(false);
                    }}
                    className="px-3 py- m-2 font-bold text-xl text-red-600 border-red-600 border-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 m-2 font-bold text-xl text-blue-600 border-blue-600 border-2"
                  >
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setLetsAdd(true)}
          className="bg-blue-600 py-3 px-5 m-2 rounded-md shadow-lg shadow-gray-500 text-xl font-bold fixed bottom-10 right-12 z-10 hover:text-white flex items-center gap-2 "
        >
          <IoIosAddCircle className="text-3xl" /> New Note
        </button>
      )}
    </>
  );
};

export default AddNote;
