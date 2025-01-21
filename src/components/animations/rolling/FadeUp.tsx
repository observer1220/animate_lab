import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FadeUpProps {
  options?: {
    scrub?: boolean | number | null;
    ease?: string | null;
  };
  children: React.ReactNode;
}

const FadeUp: React.FC<FadeUpProps> = ({ options, children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements =
      containerRef.current?.querySelectorAll<HTMLElement>("[data-scroll]");

    const tweens: gsap.core.Tween[] = [];

    elements?.forEach((el) => {
      const {
        scrollY,
        scrollOpacity,
        scrollDelay,
        scrollDuration,
        scrollEase,
      } = el.dataset;

      const tween = gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          toggleActions: "restart none none reverse",
        },
        duration: scrollDuration ? parseFloat(scrollDuration) : 0.5,
        delay: scrollDelay ? parseFloat(scrollDelay) : undefined,
        ease: scrollEase || "power1.out",
        y: scrollY ? `${scrollY}%` : undefined,
        opacity: scrollOpacity ? parseFloat(scrollOpacity) : undefined,
      });

      tweens.push(tween);
    });

    return () => {
      tweens.forEach((tween) => tween.kill());
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [options]);

  return <div ref={containerRef}>{children}</div>;
};

export default FadeUp;
