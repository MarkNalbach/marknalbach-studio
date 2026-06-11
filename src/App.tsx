import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutPage from "./features/about/AboutPage";
import HomePage from "./features/home/HomePage";
import PhaseForgePage from "./features/phase-forge/PhaseForgePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/phase-forge" element={<PhaseForgePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;