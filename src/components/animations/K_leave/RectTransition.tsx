import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import loadingSVG from "../../../assets/img/loading.svg";

interface RectProps {
  onTransitionStart?: () => void;
  onTransitionEnd?: () => void;
}

const svgPaths = ["M0 300h300v-0H0z", "M0 0h300v336H0z"];

const WaveTransition: React.FC<RectProps> = ({
  onTransitionStart,
  onTransitionEnd,
}) => {
  const pathRef = useRef<SVGPathElement | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const startTransition = (): Promise<void> => {
    return new Promise((resolve) => {
      if (!pathRef.current) return resolve();

      const traverse = (step = 0) => {
        gsap.to(pathRef.current, {
          duration: 1 / svgPaths.length,
          ease: "none",
          attr: {
            d: svgPaths[step],
          },
          onComplete: () => {
            if (step < svgPaths.length - 1) {
              traverse(step + 1);
            } else {
              gsap.to(".page-layout__route-transition-loading", {
                opacity: 1,
                onComplete: () => {
                  resolve();
                },
              });
            }
          },
        });
      };
      traverse();
    });
  };

  const endTransition = (): Promise<void> => {
    return new Promise((resolve) => {
      if (!pathRef.current) return resolve();

      const traverse = (step = svgPaths.length - 1) => {
        gsap.to(pathRef.current, {
          duration: 1 / svgPaths.length,
          ease: "none",
          attr: {
            d: svgPaths[step],
          },
          onStart: () => {
            gsap.to(".page-layout__route-transition-loading", {
              opacity: 0,
            });
          },
          onComplete: () => {
            if (step > 0) {
              traverse(step - 1);
            } else {
              resolve();
            }
          },
        });
      };
      traverse();
    });
  };

  useEffect(() => {
    const performTransition = async () => {
      if (isTransitioning) return;

      setIsTransitioning(true);

      if (onTransitionStart) {
        onTransitionStart();
      }

      await startTransition();
      await endTransition();

      if (onTransitionEnd) {
        onTransitionEnd();
      }

      setIsTransitioning(false);
    };

    performTransition();
  }, []);

  return (
    <div className="page-layout__route-transition">
      <svg
        viewBox="0 0 300 300"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          id="rect"
          fill="#40587c"
          d="M35 302.997C76.5 292.764 122 320.497 163.5 315.497C183.5 313.088 207 302.997 300 320.497V328.886C300 332.847 297.851 336.058 295.2 336.058H4.8C2.149 336.058 0 332.847 0 328.886V315.497C12 308.997 17 307.435 35 302.997Z"
        />
      </svg>
      <svg
        viewBox="0 0 300 300"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path id="rect" fill="#40587C" d="M0 300h300v-0H0z" />
      </svg>
      <div className="page-layout__route-transition-loading">
        <img src={loadingSVG} alt="loading" />
      </div>
    </div>
  );
};

export default WaveTransition;
