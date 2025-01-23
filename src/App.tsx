import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import MainPage from "./page/MainPage";
import ProgramPage from "./page/ProgramPage";
import {
  LoadingProgress,
  LoadingLogo,
} from "./components/animations/A_loading";
import { AnimatePresence } from "framer-motion";
import TransitionLoader from "./components/animations/K_leave/TransitionLoader";

function App() {
  return (
    <LoadingProgress minTime={1000} fakeProgress={80}>
      <BrowserRouter basename="/music_festival/">
        <TransitionLoader mode="rect" />
        <AnimatePresence mode="wait">
          <Layout>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/program" element={<ProgramPage />} />
            </Routes>
          </Layout>
        </AnimatePresence>
      </BrowserRouter>
    </LoadingProgress>
  );
}

export default App;
