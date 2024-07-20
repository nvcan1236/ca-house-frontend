import { useEffect } from "react";

function useScrollLock(): void {
  useEffect(() => {
    const originalStyle: string = window.getComputedStyle(
      document.body
    ).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);
}

export default useScrollLock;
