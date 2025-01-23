import React, { useEffect } from "react";
import gsap from "gsap";
import "./BlockText.css";

/** 進場動態 */
const BlockText: React.FC = () => {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLDivElement>("[data-text]");

    els.forEach((el) => {
      el.classList.add("text-block");

      const params = {
        progress: 0,
        progressBack: 1,
      };

      const textDelay = parseFloat(el.dataset.textDelay || "1");
      const textDuration = parseFloat(el.dataset.textDuration || "1");

      el.style.setProperty("--progress", `${params.progress}`);
      el.style.setProperty("--progress-back", `${params.progressBack}`);
      el.style.setProperty("--transform-origin", "left");

      const tl = gsap.timeline();
      tl.to(
        params,
        {
          duration: textDuration / 2,
          delay: textDelay,
          progress: 1,
          onUpdate() {
            el.style.setProperty("--progress", `${params.progress}`);
          },
          onComplete() {
            el.style.setProperty("--transform-origin", "right");
          },
        },
        "start"
      )
        .to(
          params,
          {
            duration: textDuration / 2,
            progress: 0,
            onUpdate() {
              el.style.setProperty("--progress", `${params.progress}`);
            },
          },
          "end"
        )
        .to(
          params,
          {
            duration: textDuration / 3,
            progressBack: 0,
            onUpdate() {
              el.style.setProperty("--progress-back", `${params.progressBack}`);
            },
          },
          "end+=0.2"
        );
    });
  }, []);

  return null;
};

export default BlockText;
