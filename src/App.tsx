import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import MainPage from "./page/MainPage";
import ProgramPage from "./page/ProgramPage";
import { LoadingProgress, LoadingLogo } from "./components/animations/loading";

function App() {
  return (
    <LoadingProgress
      minTime={1000}
      fakeProgress={80}
      onLoadingDone={() => console.log("Loading complete")}
    >
      <BrowserRouter basename="/music_festival">
        <Layout>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/program" element={<ProgramPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </LoadingProgress>
  );
}

export default App;
