import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import mobileInnerHeight from "./utils/mobileInnerHeight";
import Layout from "./components/layout/Layout";
import MainPage from "./page/MainPage";
import ProgramPage from "./page/ProgramPage";
import LoadingEffect from "./components/animations/A_loading/LoadingEffect";
import { AnimatePresence } from "framer-motion";
import TransitionLoader from "./components/animations/K_leave/TransitionLoader";

function App() {
  useEffect(() => {
    const innerHeight = mobileInnerHeight();
    const mainElement = document.querySelector(".page-layout main");
    if (mainElement) {
      (mainElement as HTMLElement).style.setProperty(
        "--vh",
        `${window.innerHeight / innerHeight(false)}vh`
      );
    }

    const resizeHandler = () => {
      (mainElement as HTMLElement).style.setProperty(
        "--vh",
        `${window.innerHeight / innerHeight(true)}vh`
      );
    };
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);
  return (
    <LoadingEffect mode="progress">
      <BrowserRouter basename="/block_design_react/">
        <TransitionLoader mode="rect" />
        <AnimatePresence mode="wait">
          <Layout>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/program" element={<ProgramPage mode="primary" />} />
            </Routes>
          </Layout>
        </AnimatePresence>
      </BrowserRouter>
    </LoadingEffect>
  );
}

export default App;
