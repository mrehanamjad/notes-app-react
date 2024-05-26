import React, { useState } from "react";
import { IoMdColorPalette } from "../icons";
import { useNotesContext } from "../contexts";

interface NotesT{
  id: number;
  title: string;
  content: string;
  bgColor: string;
  label: string[];
}


interface BgColorProps {
  note?: NotesT;
  setBg?: (value: string) => void; // Changed return type to void
}

const BgColor: React.FC<BgColorProps> = ({ note, setBg }) => {
    // @ts-ignore

  const [allColors, setAllColors] = useState<string[]>([
    "bg-[#f8f9fa]  dark:bg-[#1e293b]",
    "bg-[#faafa8]  dark:bg-[#77172e]",
    "bg-[#f39f76]  dark:bg-[#692b17]",
    "bg-[#fff8b8]  dark:bg-[#7c4a03]",
    "bg-[#d4e4ed]  dark:bg-[#264d3b]",
    "bg-[#e2f6d3]  dark:bg-[#0c625d]",
    "bg-[#b4ddd3]  dark:bg-[#256377]",
    "bg-[#aeccdc]  dark:bg-[#284255]",
    "bg-[#d3bfdb]  dark:bg-[#472e5b]",
    "bg-[#f6e2dd]  dark:bg-[#6c394f]",
    "bg-[#e9e3d4]  dark:bg-[#4b443a]",
    "bg-[#efeff1]  dark:bg-[#232427]",
  ]);
  const [letsChangeBg, setLetsChangeBg] = useState<boolean>(false);

  const { updateNote } = useNotesContext();

  const update = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newColor = e.currentTarget.value;
    if (note) updateNote(note.id, { ...note, bgColor: newColor });

    if (setBg) setBg(newColor);
  };

  return (
    <div
      title="Background Color"
      onClick={() => setLetsChangeBg((prev) => !prev)}
      className="p-2 hover:bg-blue-300 rounded-full text-2xl"
    >
      <IoMdColorPalette />
      {letsChangeBg && (
        <div className="absolute w-52 sm:w-[25rem] rounded-md sm:rounded-2xl bg-black/45 flex gap-1 sm:items-center justify-evenly flex-wrap p-1">
          {allColors.map((color) => (
            <button
              key={color}
              onClick={update}
              value={color}
              className={`h-7 w-7 ${color} rounded-full cursor-pointer`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BgColor;
