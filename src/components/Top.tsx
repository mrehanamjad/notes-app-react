import React, { useState } from "react";
import { CiSearch, MdLabel, CiCircleChevDown } from "../icons";
import {LabelNav} from "./index";

interface TopProp{
  setToBeSeached: (value:string) => void;
}

const Top: React.FC<TopProp> = ({setToBeSeached}) => {
  const [showLabelNav, setShowLabelNav] = useState(false);

  return (
    <div className="w-full h-12  flex items-center justify-center gap-1 lg:px-[20%] sm:px-[10%] px-[2%] mt-4">
      <form
        action=""
        className="w-full relative shadow-lg border-b-2 rounded-md dark:border-2 dark:text-white"
      >
        <CiSearch className="absolute text-2xl font-extrabold top-1/2 left-1 -translate-y-1/2" />
        <input
          type="search"
          className="outline-none rounded-md py-2 px-4 pl-8 w-full   dark:bg-transparent"
          placeholder="Search Note..."
          onChange={(e) => setToBeSeached(e.currentTarget.value)}
        />
      </form>
      <div className="relative">
        <button
          onClick={() => setShowLabelNav((prev) => !prev)}
          className="p-2  flex gap-1 items-center  rounded-md font-medium shadow-lg border-2 border-gray-300 dark:text-white"
        >
          {" "}
          <MdLabel className="text-xl" /> Labels{" "}
          <CiCircleChevDown className="text-xl ml-1" />
        </button>
        <LabelNav setShowLabelNav={setShowLabelNav} showLabelNav={showLabelNav} />
      </div>
    </div>
  );
};

export default Top;
