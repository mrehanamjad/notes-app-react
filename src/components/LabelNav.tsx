import React, { useEffect, useState } from "react";
import { useNotesContext } from "../contexts";

interface LabelNavProps {
    setShowLabelNav: (value: boolean | ((prev: boolean) => boolean)) => void;
    showLabelNav:boolean
  }

const LabelNav: React.FC <LabelNavProps>= ({ setShowLabelNav,showLabelNav }) => {
  const { notes, setLabelFilterFunc } = useNotesContext();
  const [labelFilterr, setLabelFilterr] = useState("");
  const [allLabels, setAllLabels] = useState<string[]>([]);

  useEffect(() => {
    setLabelFilterFunc(labelFilterr);
    setShowLabelNav((prev:boolean) => !prev);
  }, [labelFilterr]);

  useEffect(() => {
    const labels = notes.map((note) => note.label[1]);
    const uniqueLabels = [...new Set(labels)]
    setAllLabels(uniqueLabels);
  }, [notes]);

  return (
    <div className={`p-4 min-w-full rounded absolute  bg-gray-500 shadow-xl z-10 border-2 ${!showLabelNav && "hidden"}`}>
      <ul className="flex flex-col gap-1">
        <li
          onClick={(e) =>
            setLabelFilterr((e.target as HTMLElement).textContent || "")
          }
          className="cursor-pointer hover:text-blue-500"
        >
          All
        </li>
        {allLabels.map(
          (label,i) => (
            (
              <li
                key={i}
                onClick={(e) => {
                  setLabelFilterr((e.target as HTMLElement).textContent || "");
                }}
                className="cursor-pointer hover:text-blue-500"
              >
                {label}
              </li>
            )
          )
        )}
      </ul>
    </div>
  );
};

export default LabelNav;
