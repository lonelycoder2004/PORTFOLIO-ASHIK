import { useEffect, useState } from "react";
import {Sun,Moon} from 'lucide-react'
import {cn} from '../lib/utils'

function ThemeToggle(){
    const [isDarkMode,setIsDarkMode]=useState(true);

    useEffect(()=>{
        const storedTheme=localStorage.getItem("theme");

        if(storedTheme==="light"){
            setIsDarkMode(false);
            document.documentElement.classList.remove("dark");
        }
        else{
            document.documentElement.classList.add("dark");
        }
    },[])

    const toggleTheme=()=>{
        if(isDarkMode){
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme","light");
            setIsDarkMode(false);
        }
        else{
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme","dark");
            setIsDarkMode(true);
        }
    }
    

    return  (
        <button onClick={toggleTheme} className={cn(
        "fixed max-sm:hidden top-4 right-3 z-50 p-2 rounded-full transition-colors duration-300",
        "focus:outlin-hidden"
      )}>
            {isDarkMode ? <Sun className="h-6 w-6 text-yellow-300"/>: <Moon className="h-6 w-6 text-blue-900"/> }
        </button>
    )
}

export default ThemeToggle;