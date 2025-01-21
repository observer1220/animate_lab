import { useEffect } from "react";

import Scale from "./ScaleEffect";
import Color from "./ColorEffect";
import LineEffect from "../click/Line";
import PowEffect from "../click/Pow";

const CursorComponent = () => {
  const cursorElement = document.querySelector(".page-layout__cursor");
  const cursor = new Scale(cursorElement as HTMLElement);
  return (
    <canvas
      className="page-layout__cursor"
      onClick={() => {
        console.log("click", cursor);
        cursor.addClickEffect(LineEffect);
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 36 -7"
              result="gooey"
            />
            <feBlend in="SourceGraphic" in2="gooey" />
          </filter>
        </defs>
      </svg>
    </canvas>
  );
};

export default CursorComponent;
