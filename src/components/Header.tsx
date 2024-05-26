import React,{ useState,useEffect } from 'react';
import { CgNotes,TbSunMoon } from '../icons';

const Header: React.FC = () => {
  const [mode, setMode] = useState("")
  
  const changeMode = () => {
    mode == "light" ? setMode("dark") : setMode("light");

    
  }

  useEffect(() => {
    const storedMode:string = localStorage.getItem("R_Mode") || "";
    if(storedMode){      
      setMode(storedMode)
    } else {
      setMode("light")
    }
  }, [])


  useEffect(() => {
    if(mode == "light"){
      document.querySelector("html")?.classList.remove("dark");
      document.querySelector("html")?.classList.add("light");
    } else{
      document.querySelector("html")?.classList.remove("light");
      document.querySelector("html")?.classList.add("dark");
    }
    if (mode && mode.length > 0) localStorage.setItem("R_Mode",mode)
  }, [mode])


  return (
    <div className='h-14 w-full bg-gray-800 flex justify-between px-5 md:px-12 items-center font-bold text-2xl text-blue-400'>
      <div className="flex gap-1 " id='logo'>
        <CgNotes className='mt-1' /> R_Notes
      </div>
      <div>
        <button onClick={changeMode} className='p-2 hover:bg-gray-900  text-3xl font-extrabold m-1 rounded-lg'><TbSunMoon /></button>
      </div>
    </div>
  );
};

export default Header;
