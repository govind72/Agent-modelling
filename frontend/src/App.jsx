import { BrowserRouter as Router, Route,  Routes } from "react-router-dom";
import AddAgent from "./components/AddAgent";
import Agents from "./components/Agents";
import SubAgents from "./components/SubAgents";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import ViewAgent from "./components/ViewAgent";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path={"/agents"} element={<Agents />} />
        <Route path={"/"} element={<Home />} />
        <Route path={"/agent/:id"} element={<ViewAgent />} />
        <Route path={"/agent/:id/subagents"} element={<SubAgents />} />
        <Route path={"/add-agent/:id"} element={<AddAgent />} />
      </Routes>
    </Router>
  );
}

export default App;
