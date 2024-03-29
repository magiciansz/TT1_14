import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import CreateItinerary from "./components/CreateItinerary";
import Dashboard from "./components/Dashboard";
import AddDestination from "./components/AddDestination";
import Destination from "./components/Destination";
import EditDestination from "./components/EditDestination";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="home" element={<Dashboard />} />
        <Route path="create-itinerary" element={<CreateItinerary />} />
        <Route path="create-destination" element={<AddDestination />} />
        <Route path="destination" element={<Destination />} />
        <Route path="edit-destination/:id" element={<EditDestination />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
