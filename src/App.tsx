import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutPage from "./features/about/AboutPage";
import HomePage from "./features/home/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;