import { useEffect, useRef, useState } from "react";
import ScrollAnimation from "../components/animations/G_rolling/ScrollAnimation";
import { programList } from "../data/program";
import "./ProgramPage.css";

interface ProgramPageProps {
  mode: "primary" | "colorful";
}

/** Program 頁面動態 */
const ProgramPage = ({ mode }: ProgramPageProps) => {
  const [className, setClassName] = useState(`-program-${mode}`);
  const layoutRef = useRef<HTMLDivElement>(null);

  const handleToggleClass = () => {
    const colors = ["#40587c", "#e2ae4a", "#5a7c40"];
    if (layoutRef) {
      colors.forEach((color, i) => {
        layoutRef.current?.style.setProperty(`--color-${i + 1}`, color);
      });
    }
    setClassName(`-program-${mode}`);
  };

  useEffect(() => {
    handleToggleClass();
  }, []);

  return (
    <div ref={layoutRef} className={className}>
      <div className="page-program" data-route="program">
        <div className="container">
          <div className="page-program__title">
            <p>前港音樂祭 ─ 節目表</p>
          </div>
          <ScrollAnimation animationMode="rotate">
            <div className="page-program__cards">
              {programList.map((program, index) => (
                <div
                  key={index}
                  className="m-program-card"
                  data-scroll
                  data-scroll-x={index % 2 === 0 ? -25 : 25}
                  data-scroll-y="50"
                  data-scroll-opacity="0"
                  data-scroll-ease="power1.out"
                  data-scroll-duration="0.5"
                  data-scroll-rotate={index % 2 === 0 ? 10 : -10}
                  data-scroll-origin={
                    index % 2 === 0 ? "left top" : "right top"
                  }
                  data-scroll-delay={index * 0.15}
                >
                  <p className="m-program-card__title">{program.nameCn}</p>
                  <p className="m-program-card__title-en">{program.nameEn}</p>
                  <p className="m-program-card__desc">{program.desc}</p>
                  <div className="m-program-card__time">
                    <span></span>
                    <p>{program.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </div>
  );
};

export default ProgramPage;
