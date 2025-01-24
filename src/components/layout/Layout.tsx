import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import RightLine from "./RightLine";
import LeftLine from "./LeftLine";
import BuyTickets from "../animations/BuyTickets";
import "./Layout.css";

// 動態模組
import StrokeLine from "../animations/E_continue/StrokeLine";
import RunInEffect from "../animations/C_runIn/RunInEffect";
import ClickEffect from "../animations/I_click/ClickEffect";
import KeypressComponent from "../animations/J_equipment/Keypress";
import CustomCursor from "../animations/H_cursor/CursorComponent";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="page-layout">
      <StrokeLine>
        <Header mode="block" />
        <LeftLine />
        <RightLine />
        <BuyTickets mode="default" />
        <main>
          {children}
          <Footer />
        </main>
      </StrokeLine>
      <RunInEffect mode="blockText" />
      <ClickEffect mode="pow" />
      <CustomCursor />
      <KeypressComponent allowKeys={["b", "s"]} />
    </div>
  );
};

export default Layout;
