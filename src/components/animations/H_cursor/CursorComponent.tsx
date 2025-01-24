import React, { useEffect, useState } from "react";
import styled from "styled-components";

const CursorContainer = styled.div`
  position: fixed;
  width: 20px;
  height: 20px;
  background-color: #b4b3b399;
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 99;
  transition: transform 0.1s ease-out;
`;

/** 游標動態 */
const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  // const [hovered, setHovered] = useState(false);

  const handleMouseMove = (event: MouseEvent) => {
    setPosition({ x: event.clientX, y: event.clientY });
  };

  // const handleMouseOver = (event: MouseEvent) => {
  //   if ((event.target as HTMLElement).tagName === "A") {
  //     setHovered(true);
  //   }
  // };

  // const handleMouseOut = (event: MouseEvent) => {
  //   if ((event.target as HTMLElement).tagName === "A") {
  //     setHovered(false);
  //   }
  // };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    // window.addEventListener("mouseover", handleMouseOver);
    // window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      // window.removeEventListener("mouseover", handleMouseOver);
      // window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <CursorContainer
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
};

export default CustomCursor;
