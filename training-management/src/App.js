import "./App.css";
import Employee from "./components/Employee";
import Header from "./components/Header";
import Login from "./components/Login";
import Skill from "./components/Skill";
import Trainings from "./components/Trainings";
import Allocations from "./components/Allocations";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import appBarComponent from "./hoc/appBarComponent";

function App() {
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/" element={<Login />} />
      <Route path="/Employee" element={<Employee />} />
      <Route path="/Skills" element={<Skill />} />
      <Route path="/Trainings" element={<Trainings />} />
      <Route path="/Allocations" element={<Allocations />} />
      <Route path="/Register" element={<Register />} />
    </Routes>
  );
}

export default appBarComponent(App);
