import { useEffect, useRef, useState, ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import RightLine from "./RightLine";
import LeftLine from "./LeftLine";
import BuyTickets from "../animations/BuyTickets";

// 動態模組
import StrokeLine from "../animations/E_/StrokeLine";
import { BlockText, TypingText } from "../animations/C_runIn";
import { PowEffect, LineEffect } from "../animations/I_click";
import KeypressComponent from "../animations/J_equipment/Keypress";
import CustomCursor from "../animations/H_cursor/CursorComponent";

import { WaveTransition } from "../animations/K_leave/wave";
import { RectTransition } from "../animations/K_leave/rect";
import mobileInnerHeight from "../../utils/mobileInnerHeight";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const layoutRef = useRef<HTMLDivElement>(null);

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
  }, []);

  return (
    <div className="page-layout" ref={layoutRef}>
      <StrokeLine>
        <Header />
        <LeftLine />
        <RightLine />
        <BuyTickets />
        <main>
          {children}
          <Footer />
        </main>
      </StrokeLine>
      <BlockText />
      <PowEffect />
      <CustomCursor />
      <KeypressComponent allowKeys={["b", "s"]} />

      {/* 離場動態 */}
      {/* <RectTransition></RectTransition> */}
      {/* <WaveTransition></WaveTransition> */}
    </div>
  );
};

export default Layout;
