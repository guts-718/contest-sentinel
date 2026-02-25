import { useEffect } from "react";

export default function useHotkey(
  key:string,
  cb:()=>void
){
  useEffect(()=>{
    const handler=(e:KeyboardEvent)=>{
      if(e.ctrlKey && e.key===key){
        e.preventDefault();
        cb();
      }
    };

    window.addEventListener("keydown",handler);
    return()=>window.removeEventListener("keydown",handler);
  },[key,cb]);
}