import { useEffect } from "react";

export function useDarkMode(){
  useEffect(() => {
      const root = window.document.documentElement;

      root.classList.add('dark');
  }, []);
}