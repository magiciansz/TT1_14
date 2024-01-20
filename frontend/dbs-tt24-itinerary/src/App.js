import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import CreateItinerary from "./Components/CreateItinerary";
import Dashboard from "./Components/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="home" element={<Dashboard />} />
        <Route path="create-itinerary" element={<CreateItinerary />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
