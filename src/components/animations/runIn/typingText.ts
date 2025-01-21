import React, { useEffect } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

const TypingText: React.FC = () => {
  gsap.registerPlugin(TextPlugin);

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-text]");

    els.forEach((el) => {
      const { textFirst, textDelay, textDuration } = el.dataset;

      el.style.display = "inline";
      const text = el.innerText;
      setTimeout(() => {
        el.innerText = "";
      }, 0);

      let cursor = el.parentNode?.querySelector<HTMLElement>("#text-cursor");

      if (!cursor) {
        cursor = document.createElement("span");
        cursor.className = "text-cursor";
        cursor.innerText = "|";
        el.parentNode?.insertBefore(cursor, el.nextSibling);
      }

      if (textFirst !== undefined) {
        cursor.classList.add("-first");
      }

      console.log(text);

      gsap.to(el, {
        duration: parseFloat(textDuration || "2"),
        delay: parseFloat(textDelay || "0"),
        text: text,
        ease: "none",
        onStart() {
          cursor.classList.add("-start");
        },
        onComplete() {
          cursor.classList.add("-end");
        },
      });
    });
  }, []);

  return null;
};

export default TypingText;
