import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import MainPage from "./page/MainPage";
import ProgramPage from "./page/ProgramPage";

function App() {
  return (
    <BrowserRouter basename="/music_festival">
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/program" element={<ProgramPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
