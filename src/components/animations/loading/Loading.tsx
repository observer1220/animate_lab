import { useEffect, useState } from "react";
import gsap from "gsap";

const Loading = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // console.log(progress);
    const updateProgress = (value: number) => {
      setProgress(value);
    };

    gsap.to(
      {},
      {
        duration: 1,
        onUpdate: () => updateProgress(100),
      }
    );
  }, [progress]);

  return (
    <div className="o-loading">
      <div className="o-loading__main" id="progress">
        <p>Loading...</p>
        <div className="o-loading__progress">
          <span></span>
          <p>0%</p>
        </div>
      </div>
      <div className="o-loading__main" id="logo">
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
        <div className="o-loading__logo-block">
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
