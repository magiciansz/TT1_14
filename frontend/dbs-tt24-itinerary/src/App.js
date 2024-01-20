import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import CreateItinerary from "./components/CreateItinerary";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='home' element={<Dashboard />} />
        <Route path='create-itinerary' element={<CreateItinerary />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
