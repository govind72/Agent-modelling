import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
// import "./Navbar.css"


const NavBar = () => {
 
  const [hoveredHome, setHoveredHome] = useState(null);
  const handleMouseEnterHome = () => {
  setHoveredHome(true);
};

const handleMouseLeaveHome = () => {
  setHoveredHome(false);
};
  const [hoveredAll, setHoveredAll] = useState(null);
  const handleMouseEnterAll = (x) => {
    setHoveredAll(x);
  };

  const handleMouseLeaveAll = () => {
    setHoveredAll(false);
  };
  const [hoveredLogin, setHoveredLogin] = useState(null);
  const handleMouseEnterLogin = () => {
    setHoveredLogin(true);
  };

  const handleMouseLeaveLogin = () => {
    setHoveredLogin(false);
  };
  const [hoveredSign, setHoveredSign] = useState(null);
  const handleMouseEnterSign = () => {
    setHoveredSign(true);
  };

  const handleMouseLeaveSign = () => {
    setHoveredSign(false);
  };

  return (
    <AppBar
      position="static"
      sx={{
        boxShadow: "none",
        margin: 0,
        marginLeft: 0,
        backgroundColor: "black",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="/" style={{ textDecoration: "none", color: "#FFF" }}>
          <h3 style={{ color: "#FFF", fontSize: "1.5rem", fontWeight: "bold" }}>
            Agent Modelling
          </h3>
        </Link>
        <div>
          <Button
            className="Navbar-btn"
            component={Link}
            to="/"
            color="inherit"
            variant="contained"
            style={{
              margin: "5px",
              backgroundColor: hoveredHome ? "#2f31317d" : "black",
            }}
            onMouseEnter={handleMouseEnterHome}
            onMouseLeave={handleMouseLeaveHome}
          >
            Home
          </Button>
          <Button
            // className="Navbar-btn"
            component={Link}
            to="/agents"
            // color="inherit"
            variant="contained"
            style={{
              margin: "5px",
              backgroundColor: hoveredAll ? "#2f31317d" : "black",
            }}
            onMouseEnter={() => handleMouseEnterAll(true)}
            onMouseLeave={handleMouseLeaveAll}
          >
            All Agents
          </Button>
          <Button
            className="Navbar-btn"
            color="inherit"
            variant="contained"
            style={{
              margin: "5px",
              backgroundColor: hoveredLogin ? "#2f31317d" : "black",
            }}
            onMouseEnter={handleMouseEnterLogin}
            onMouseLeave={handleMouseLeaveLogin}
          >
            Login
          </Button>
          <Button
            className="Navbar-btn"
            color="inherit"
            variant="contained"
            style={{
              margin: "5px",
              backgroundColor: hoveredSign ? "#2f31317d" : "black",
            }}
            onMouseEnter={handleMouseEnterSign}
            onMouseLeave={handleMouseLeaveSign}
          >
            Sign up
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
