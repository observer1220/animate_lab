import React, { useEffect } from "react";

interface StrokeLineProps {
  children: React.ReactNode;
}

const StrokeLine: React.FC<StrokeLineProps> = ({ children }) => {
  useEffect(() => {
    const refresh = () => {
      const els = document.querySelectorAll<SVGPathElement>("[data-stroke]");

      els.forEach((el) => {
        let parent: Node | null = el.parentNode;
        while (parent) {
          if (parent instanceof Element) {
            if (getComputedStyle(parent).display === "none") return;
          }
          parent = parent.parentNode;
        }

        const { strokeDirection } = el.dataset;
        const direction: number = strokeDirection
          ? parseInt(strokeDirection)
          : 1;
        const dashLength = el.getTotalLength();
        if (direction > 0) {
          el.style.setProperty("--svg-dashoffset-from", "0");
          el.style.setProperty(
            "--svg-dashoffset-to",
            (2 * dashLength).toString()
          );
        } else {
          el.style.setProperty(
            "--svg-dashoffset-from",
            (2 * dashLength).toString()
          );
          el.style.setProperty("--svg-dashoffset-to", "0");
        }
        el.style.strokeDasharray = dashLength.toString();
        el.classList.add("stroke-line");
      });
    };

    refresh();
  }, []);

  return <>{children}</>;
};

export default StrokeLine;
