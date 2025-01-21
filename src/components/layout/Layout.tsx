import { useEffect, useRef, useState, ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import RightLine from "./RightLine";
import LeftLine from "./LeftLine";
import BuyTickets from "../animations/BuyTickets";

// 動態模組
import StrokeLine from "../animations/StrokeLine";
import { BlockText, TypingText } from "../animations/runIn";
import { PowEffect, LineEffect } from "../animations/click";

import KeypressComponent from "../animations/keypress";
import { WaveTransition } from "../animations/leave/wave";
import { RectTransition } from "../animations/leave/rect";
import CursorComponent from "../animations/cursor/CursorComponent";
import mobileInnerHeight from "../../utils/mobileInnerHeight";
import Loading from "../animations/loading/Loading";
import Parallax from "../animations/banner/parallax";
import Noise from "../animations/banner/noise";
import FadeUp from "../animations/rolling/FadeUp";
import ScrollComponent from "../animations/rolling/Scroll";
import Scroll from "../animations/rolling/Scroll";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const layoutRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const layout = layoutRef.current;

    // 顏色設定
    const colors = ["#40587c", "#e2ae4a", "#5a7c40"];
    if (layout && layoutRef) {
      colors.forEach((color, i) => {
        layout.style.setProperty(`--color-${i + 1}`, color);
      });

      // 回饋動態
      layout.classList.add("-underline");
      // layout.classList.add('-block')

      // 按鈕動態
      layout.classList.add("-button-default");
      // layout.classList.add('-button-elastic')

      // Program頁面動態
      // layout.classList.add("-program-colorful");
      layout.classList.add("-program-primary");

      // 過渡
      layout.classList.add("-rotate");
      // layout.classList.add('-scale')
    }

    const innerHeight = mobileInnerHeight();
    const mainElement = document.querySelector(".page-layout main");
    if (mainElement) {
      (mainElement as HTMLElement).style.setProperty(
        "--vh",
        `${window.innerHeight / innerHeight(false)}vh`
      );
    }
    window.addEventListener("resize", () => {
      (mainElement as HTMLElement).style.setProperty(
        "--vh",
        `${window.innerHeight / innerHeight(true)}vh`
      );
    });

    // loading.on("loadingDone", () => {
    //   document.body.classList.remove("-loading");
    // });
  }, []);

  // if (isLoading) {
  //   return <Loading />;
  // }

  return (
    <div className="page-layout" ref={layoutRef}>
      {/* <StrokeLine> */}
      <Header />
      <LeftLine />
      <RightLine />
      <BuyTickets />
      <main>
        {children}
        <Footer />
      </main>
      {/* </StrokeLine> */}
      {/* 主要動態 */}
      {/* <Parallax /> */}
      {/* <Noise /> */}

      <BlockText />
      {/* <TypingText /> */}
      {/* 離場動態 */}
      {/* <RectTransition></RectTransition> */}
      {/* <WaveTransition></WaveTransition> */}
      {/* 游標動態 */}
      {/* 點擊動態 */}
      <PowEffect />
      {/* <LineEffect /> */}

      {/* <CanvasEffect /> */}

      {/* 設備動態 */}
      {/* <KeypressComponent allowKeys={["b", "s"]} /> */}
    </div>
  );
};

export default Layout;
