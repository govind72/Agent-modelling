import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import AddAgent from "./components/AddAgent";
import Agents from "./components/Agents";
import SubAgents from "./components/SubAgents";
import NavBar from "./components/NavBar";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path={"/agents"} element={<Agents />} />
        <Route path={"/"} element={<Home />} />
        <Route path={"/agent/:id"} element={<SubAgents />} />
        <Route path={"/add-agent"} element={<AddAgent />} />
      </Routes>
    </Router>
  );
}

export default App;
