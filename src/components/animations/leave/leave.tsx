import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface LeaveTransitionProps {
  svgId: string;
  svgPaths: string[];
  children?: React.ReactNode;
}

class Leave {
  private path: SVGPathElement | null = null;
  private svgPaths: string[] = [];

  constructor(path: SVGPathElement | null, svgPaths: string[]) {
    this.path = path;
    this.svgPaths = svgPaths;
  }

  startTransition(): Promise<void> {
    if (this.path) {
      return new Promise((resolve) => {
        const traverse = (step = 0) => {
          gsap.to(this.path, {
            duration: 1 / this.svgPaths.length,
            ease: "none",
            attr: { d: this.svgPaths[step] },
            onComplete: () => {
              if (step < this.svgPaths.length - 1) {
                traverse(step + 1);
              } else {
                gsap.to(".page-layout__route-transition-loading", {
                  opacity: 1,
                  onComplete: () => resolve(),
                });
              }
            },
          });
        };
        traverse();
      });
    }
    return Promise.resolve();
  }

  endTransition(): Promise<void> {
    if (this.path) {
      return new Promise((resolve) => {
        const traverse = (step = this.svgPaths.length - 1) => {
          gsap.to(this.path, {
            duration: 1 / this.svgPaths.length,
            ease: "none",
            attr: { d: this.svgPaths[step] },
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
    }
    return Promise.resolve();
  }
}

const LeaveTransition: React.FC<LeaveTransitionProps> = ({
  svgId,
  svgPaths,
  children,
}) => {
  const leaveRef = useRef<Leave | null>(null);

  useEffect(() => {
    const pathElement = document.getElementById(svgId) as SVGPathElement | null;
    if (pathElement) {
      leaveRef.current = new Leave(pathElement, svgPaths);
    }
  }, [svgId, svgPaths]);

  const startTransition = () => leaveRef.current?.startTransition();
  const endTransition = () => leaveRef.current?.endTransition();

  return (
    <div className="page-layout__route-transition">
      {children}
      <button onClick={startTransition}>Start Transition</button>
      <button onClick={endTransition}>End Transition</button>
    </div>
  );
};

export default LeaveTransition;
