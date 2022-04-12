import {useEffect, useState} from "react";

export function useImageDimensions(src?: string) {
  const [dimensions, setDimensions] = useState([0, 0])
  useEffect(() => {
    if (src) {
      const i = new Image()
      i.onload = function () {
        setDimensions([i.width, i.height])
      };
      i.src = src

    }
  }, [src]);

  return dimensions;
}
