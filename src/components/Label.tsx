import React, { useState,useEffect } from "react";
import { MdLabel } from "../icons";

interface LabelProps {
  setLabel: (value: string) => void; // Changed return type to void
  label: string;
}

const Label: React.FC<LabelProps>= ({ setLabel,label }) => {
  const [valLabel, setValLabel] = useState(label)

  useEffect(() => {
    setLabel(valLabel)
  }, [valLabel])
  



  return (
    <div
      title="Add Label"
      className="hover:bg-blue-500  p-1 border-b-2 relative  text-md"
    >
      <MdLabel className="absolute top-1/2 left-1 -translate-y-1/2 " />
            <input
              type="text"
              maxLength={18}
              className="outline-none bg-transparent placeholder:text-slate-700 dark:placeholder:text-slate-300  pl-5 text-md"
              placeholder="⌕ Enter label name.."
              onChange={(e) => setValLabel(e.target.value)}
              value={valLabel}
            />
    </div>
  );
};

export default Label;
