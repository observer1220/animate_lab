import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./Loading.css";

interface LoadingLogoProps {
  children: React.ReactNode;
  minTime?: number;
  fakeProgress?: number;
  onLoadingDone?: () => void;
}

interface LoadingContextType {
  addLoadingStack: (promise: Promise<any> | Promise<any>[]) => void;
  removeLoadingStack: () => void;
}

const LoadingContext = React.createContext<LoadingContextType | null>(null);

export const useLoading = () => {
  const context = React.useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

export const LoadingLogo: React.FC<LoadingLogoProps> = ({
  children,
  minTime = 1000,
  fakeProgress = 80,
  onLoadingDone,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const loadingStacksRef = useRef<Promise<any>[]>([]);
  const bodyLockRef = useRef<HTMLDivElement>(null);
  const logoBlockRef = useRef<HTMLDivElement>(null);
  const logoSpanRef = useRef<HTMLSpanElement>(null);

  // Clamp fakeProgress between 0 and 100
  const clampedFakeProgress = Math.max(Math.min(fakeProgress, 100), 0);

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

    // Initial logo animation
    if (logoSpanRef.current) {
      gsap.to(logoSpanRef.current, {
        duration: minTime / 1000,
        ease: "none",
        y: `${100 - clampedFakeProgress}%`,
      });
    }

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

        // Final logo animation
        if (logoSpanRef.current) {
          gsap.to(logoSpanRef.current, {
            duration:
              ((100 - clampedFakeProgress) * (minTime / 1000)) /
              clampedFakeProgress,
            ease: "none",
            y: "0%",
            overwrite: true,
            onComplete: () => {
              setIsLoading(false);
              onLoadingDone?.();
              if (bodyLockRef.current) {
                document.body.classList.remove("-loading");
              }
            },
          });
        }
      } catch (error) {
        console.error("Loading error:", error);
        setIsLoading(false);
      }
    };

    waitLoading();

    return () => {
      document.body.classList.remove("-loading");
      if (logoSpanRef.current) {
        gsap.killTweensOf(logoSpanRef.current);
      }
    };
  }, [minTime, clampedFakeProgress, onLoadingDone]);

  return (
    <LoadingContext.Provider value={{ addLoadingStack, removeLoadingStack }}>
      <div ref={bodyLockRef} className="relative">
        {isLoading && (
          <div className="o-loading fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <svg
              width="133"
              height="78"
              viewBox="0 0 133 78"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <clipPath id="logo-clip">
                <path
                  d="M96.9412 47.5913L96.5866 49.0446L97.7438 48.0966L119.975 29.8831L132.431 47.7683L119.746 77.5H52.6269L51.8614 77.5H7.45816L0.557167 47.8975L44.5758 11.4306L58.8929 27.9102L59.3074 28.3873L59.6763 27.8741L79.2532 0.643521L105.109 14.1098L96.9412 47.5913Z"
                  stroke="white"
                />
              </clipPath>
            </svg>
            <div
              ref={logoBlockRef}
              className="o-loading__logo-block overflow-hidden w-32 h-32"
            >
              <span
                ref={logoSpanRef}
                className="block w-full h-full bg-white"
              />
            </div>
          </div>
        )}
        {children}
      </div>
    </LoadingContext.Provider>
  );
};

export default LoadingLogo;
