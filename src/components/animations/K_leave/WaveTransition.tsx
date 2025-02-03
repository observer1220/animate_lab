import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import loadingSVG from "../../../assets/img/loading.svg";

interface WaveTransitionProps {
  onTransitionStart?: () => void;
  onTransitionEnd?: () => void;
}

const svgPaths = [
  "M35 302.997C76.5 292.764 122 320.497 163.5 315.497C183.5 313.088 207 302.997 300 320.497V328.886C300 332.847 297.851 336.058 295.2 336.058H4.8C2.149 336.058 0 332.847 0 328.886V315.497C12 308.997 17 307.435 35 302.997Z",
  "M35 276.997C76.5 266.764 122 294.497 163.5 289.497C183.5 287.088 207 276.997 300 294.497V302.886C300 306.847 297.851 310.058 295.2 310.058H4.8C2.149 310.058 0 306.847 0 302.886V289.497C12 282.997 17 281.435 35 276.997Z",
  "M106 219.368C136.909 194.918 158.705 189.537 187.5 202.494C225 219.368 246 261.994 300 238.994V303.883C300 307.844 297.851 311.055 295.2 311.055H4.8C2.149 311.055 0 307.844 0 303.883V219.368C27.2727 253.326 75.0909 243.818 106 219.368Z",
  "M87.5 112.498C131.936 131.132 162.034 125.914 192.5 105.498C241 72.9982 275.5 80.9981 300 112.498V302.887C300 306.848 297.851 310.059 295.2 310.059H4.8C2.149 310.059 0 306.848 0 302.887V97.4983C37 72.9982 56.5 99.4982 87.5 112.498Z",
  "M103 -17.7626C153.5 -4.6765 193.5 3.33226 233 -6.85739C279.5 -18.8528 300 -17.7624 300 -6.8575V302.179C300 306.498 297.851 310 295.2 310H4.8C2.149 310 0 306.498 0 302.179V-17.7623C38 10.0454 57.7597 -29.4858 103 -17.7626Z",
];

const WaveTransition: React.FC<WaveTransitionProps> = ({
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
          id="wave"
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
