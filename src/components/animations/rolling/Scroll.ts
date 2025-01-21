import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollOptions {
  start?: string;
  end?: string;
  scrub?: number | boolean;
  ease?: string;
  markers?: boolean;
}

const Scroll: React.FC<ScrollOptions> = ({
  start = "0% 80%",
  end = "100% 80%",
  scrub = 1,
  ease = "none",
  markers = false,
}) => {
  const tweensRef = useRef<gsap.core.Tween[]>([]);

  useEffect(() => {
    const options = { start, end, scrub, ease, markers };
    ScrollTrigger.defaults(options);

    const elements = document.querySelectorAll("[data-scroll]");
    const tweens: gsap.core.Tween[] = [];

    elements.forEach((el) => {
      const tween = gsap.to(el, {
        // Add your animation properties here, e.g., x: 100
        scrollTrigger: {
          trigger: el,
          ...options,
        },
      });
      tweens.push(tween);
    });

    tweensRef.current = tweens;

    // Cleanup function
    return () => {
      while (tweensRef.current.length) {
        const tween = tweensRef.current.pop();
        tween?.scrollTrigger?.kill(true);
        tween?.kill();
      }
    };
  }, [start, end, scrub, ease, markers]);
};

export default Scroll;
