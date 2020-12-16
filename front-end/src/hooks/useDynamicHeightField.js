import { useEffect } from "react";

//Hook to expand heigh of comment box as user tpyes more
const useDynamicHeightField = (element, value) => {
  useEffect(() => {
    if (!element) return;

    element.current.style.height = "auto";
    element.current.style.height = element.current.scrollHeight + "px";
  }, [element, value]);
};

export default useDynamicHeightField;
