import { useEffect } from "react";

export function useOutsideClick(ref:React.RefObject<any>,setDisplay:Function) {
  useEffect(() => {
    document.addEventListener("mousedown",handleClick);

    return () => {
      document.removeEventListener("mousedown",handleClick);
    }
  },[])

  const handleClick = (e:Event) => {
    if(ref.current && !ref.current.contains(e.target)){
      setDisplay(false);
    }
  }
}