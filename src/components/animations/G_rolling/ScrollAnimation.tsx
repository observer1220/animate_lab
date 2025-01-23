import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollOptions {
  start?: string;
  end?: string;
  scrub?: number | boolean;
  ease?: string;
  markers?: boolean;
}

const ScrollAnimation: React.FC<{
  children: React.ReactNode;
  animationMode: "fadeup" | "rotate" | "fadeside";
}> = ({ children, animationMode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tweensRef = useRef<gsap.core.Tween[]>([]);
  const defaultOptions: ScrollOptions = {
    start: "0% 80%",
    end: "100% 80%",
    scrub: 1,
    ease: "none",
    markers: false,
  };

  const FadeUp = () => {
    if (!containerRef.current) return;

    const elements =
      containerRef.current.querySelectorAll<HTMLElement>("[data-scroll]");

    elements.forEach((el) => {
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
          start: defaultOptions.start,
          end: defaultOptions.end,
          scrub: defaultOptions.scrub,
          toggleActions: "restart none none reverse",
        },
        duration: parseFloat(scrollDuration || "0.5"),
        delay: parseFloat(scrollDelay || "0"),
        ease: scrollEase || "power1.out",
        y: scrollY ? `${scrollY}%` : undefined,
        opacity: scrollOpacity ? parseFloat(scrollOpacity) : undefined,
      });

      tweensRef.current.push(tween);
    });
  };

  const FadeSide = () => {
    if (!containerRef.current) return;

    const elements =
      containerRef.current.querySelectorAll<HTMLElement>("[data-scroll]");

    elements.forEach((el) => {
      const {
        scrollX,
        scrollOpacity,
        scrollDelay,
        scrollDuration,
        scrollEase,
      } = el.dataset;

      const tween = gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: defaultOptions.start,
          end: defaultOptions.end,
          scrub: defaultOptions.scrub,
          toggleActions: "restart none none reverse",
        },
        duration: parseFloat(scrollDuration || "0.5"),
        delay: parseFloat(scrollDelay || "0"),
        ease: scrollEase || "power1.out",
        x: scrollX ? `${scrollX}%` : undefined,
        opacity: scrollOpacity ? parseFloat(scrollOpacity) : undefined,
      });

      tweensRef.current.push(tween);
    });
  };

  const Rotate = () => {
    if (!containerRef.current) return;

    const elements =
      containerRef.current.querySelectorAll<HTMLElement>("[data-scroll]");

    elements.forEach((el) => {
      const {
        scrollRotate,
        scrollOpacity,
        scrollDelay,
        scrollDuration,
        scrollEase,
      } = el.dataset;

      const tween = gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: defaultOptions.start,
          end: defaultOptions.end,
          scrub: defaultOptions.scrub,
          toggleActions: "restart none none reverse",
        },
        duration: parseFloat(scrollDuration || "0.5"),
        delay: parseFloat(scrollDelay || "0"),
        ease: scrollEase || "power1.out",
        rotate: scrollRotate ? parseFloat(scrollRotate) : undefined,
        opacity: scrollOpacity ? parseFloat(scrollOpacity) : undefined,
      });

      tweensRef.current.push(tween);
    });
  };

  const cleanUpAnimations = () => {
    tweensRef.current.forEach((tween) => {
      if (tween.scrollTrigger) {
        tween.scrollTrigger.kill(true);
      }
      tween.kill();
    });
    tweensRef.current = [];
  };

  useEffect(() => {
    ScrollTrigger.defaults(
      defaultOptions as gsap.plugins.ScrollTriggerInstanceVars
    );

    switch (animationMode) {
      case "fadeup":
        FadeUp();
        break;
      case "fadeside":
        FadeSide();
        break;
      case "rotate":
        Rotate();
        break;
    }

    return () => {
      cleanUpAnimations();
    };
  }, []);

  return <div ref={containerRef}>{children}</div>;
};

export default ScrollAnimation;
