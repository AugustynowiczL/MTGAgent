import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import CardPage from "./pages/CardPage";
import FullDeckBuilder from "./pages/FullDeckBuilder";

function App() {
  const cardTypes = ["creature", "artifact", "enchantment", "instant", "land", "sorcery"];

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/deck" />} />
        {cardTypes.map((type) => (
          <Route key={type} path={`/${type}`} element={<CardPage cardType={type} />} />
        ))}
         <Route path="/deck" element={<FullDeckBuilder />} />
      </Routes>
    </Router>
  );
}

export default App;
