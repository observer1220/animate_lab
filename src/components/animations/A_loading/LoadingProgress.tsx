import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./Loading.css";

interface LoadingProps {
  children: React.ReactNode;
  minTime?: number;
  fakeProgress?: number;
}

interface LoadingContextType {
  addLoadingStack: (promise: Promise<any> | Promise<any>[]) => void;
  removeLoadingStack: () => void;
}

interface AnimationState {
  value: number;
}

const LoadingContext = React.createContext<LoadingContextType | null>(null);

export const useLoading = () => {
  const context = React.useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

export const Loading: React.FC<LoadingProps> = ({
  children,
  minTime = 1000,
  fakeProgress = 80,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const loadingStacksRef = useRef<Promise<any>[]>([]);
  const bodyLockRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const progressTextRef = useRef<HTMLParagraphElement>(null);
  const animationState = useRef<AnimationState>({ value: 0 });

  // Clamp fakeProgress between 0 and 100
  const clampedFakeProgress = Math.max(Math.min(fakeProgress, 100), 0);

  const updateProgress = (value: number) => {
    setProgress(value);
    if (progressRef.current) {
      progressRef.current.style.setProperty("--progress", `${value / 100}`);
    }
    if (progressTextRef.current) {
      progressTextRef.current.innerText = `${Math.round(value)}%`;
    }
  };

  const addLoadingStack = (payload: Promise<any> | Promise<any>[]) => {
    if (Array.isArray(payload)) {
      const promise = Promise.all(payload.filter((p) => p instanceof Promise));
      loadingStacksRef.current.push(promise);
      return promise;
    }
    if (payload instanceof Promise) {
      loadingStacksRef.current.push(payload);
      return payload;
    }
  };

  const removeLoadingStack = () => {
    loadingStacksRef.current.shift();
  };

  useEffect(() => {
    // Add initial minimum time promise
    const minTimePromise = new Promise((resolve) => {
      setTimeout(resolve, minTime);
    });
    loadingStacksRef.current = [minTimePromise];

    // Initial progress animation
    gsap.to(animationState.current, {
      value: clampedFakeProgress,
      duration: minTime / 1000,
      ease: "none",
      onUpdate: () => {
        updateProgress(animationState.current.value);
      },
    });

    // Handle loading state
    const waitLoading = async () => {
      if (bodyLockRef.current) {
        document.body.classList.add("-loading");
      }

      try {
        const results = await Promise.all(loadingStacksRef.current);
        results.forEach(() => {
          removeLoadingStack();
        });

        // Final progress animation
        gsap.to(animationState.current, {
          value: 100,
          duration: (minTime / 1000) * (1 - clampedFakeProgress / 100),
          ease: "none",
          onUpdate: () => {
            updateProgress(animationState.current.value);
          },
          onComplete: () => {
            setIsLoading(false);
            if (bodyLockRef.current) {
              document.body.classList.remove("-loading");
            }
          },
        });
      } catch (error) {
        console.error("Loading error:", error);
        setIsLoading(false);
      }
    };

    waitLoading();

    return () => {
      document.body.classList.remove("-loading");
      gsap.killTweensOf(animationState.current);
    };
  }, [minTime, clampedFakeProgress]);

  return (
    <LoadingContext.Provider value={{ addLoadingStack, removeLoadingStack }}>
      <div ref={bodyLockRef}>
        {isLoading && (
          <div className="o-loading">
            <div className="o-loading__progress">
              <span
                ref={progressRef}
                className="block"
                style={{
                  transform: `scaleX(${progress / 100})`,
                  transformOrigin: "left",
                }}
              />
            </div>
            <p ref={progressTextRef}>0%</p>
          </div>
        )}
        {children}
      </div>
    </LoadingContext.Provider>
  );
};

export default Loading;
