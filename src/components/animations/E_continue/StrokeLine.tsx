import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";

interface StrokeLineProps {
  children: React.ReactNode;
}

const dashAnimation = keyframes`
  from {
    stroke-dashoffset: var(--svg-dashoffset-from);
  }
  to {
    stroke-dashoffset: var(--svg-dashoffset-to);
  }
`;

const StyledStrokeLine = styled.div`
  [data-stroke].stroke-line {
    -webkit-animation: ${dashAnimation} 1s linear infinite;
    animation: ${dashAnimation} 1s linear infinite;
  }
`;

const StrokeLine: React.FC<StrokeLineProps> = ({ children }) => {
  const refresh = () => {
    const elements = document.querySelectorAll<SVGPathElement>("[data-stroke]");

    elements.forEach((element) => {
      if (isHidden(element)) return;

      const direction = parseInt(element.dataset.strokeDirection || "1", 10);
      const dashLength = element.getTotalLength();
      const dashOffsetFrom = direction > 0 ? "0" : (2 * dashLength).toString();
      const dashOffsetTo = direction > 0 ? (2 * dashLength).toString() : "0";

      element.style.setProperty("--svg-dashoffset-from", dashOffsetFrom);
      element.style.setProperty("--svg-dashoffset-to", dashOffsetTo);
      element.style.strokeDasharray = dashLength.toString();
      element.classList.add("stroke-line");
    });
  };

  const isHidden = (element: Element): boolean => {
    let parent: Node | null = element.parentNode;
    while (parent) {
      if (
        parent instanceof Element &&
        getComputedStyle(parent).display === "none"
      ) {
        return true;
      }
      parent = parent.parentNode;
    }
    return false;
  };

  useEffect(() => {
    refresh();
  }, []);

  return <StyledStrokeLine>{children}</StyledStrokeLine>;
};

export default StrokeLine;
