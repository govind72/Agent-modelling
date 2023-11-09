import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

const NavBar = () => {
  return (
    <AppBar position="static" sx={{ boxShadow: 'none', margin: 0, marginLeft: 0 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#FFF' }}>
          <h3 style={{ color: '#FFF', fontSize: '1.5rem', fontWeight: 'bold' }}>Agent Modelling</h3>
        </Link>
        <div>
          <Button component={Link} to="/" color="inherit" variant="text">Home</Button>
          <Button component={Link} to="/agents" color="inherit" variant="text">All Agents</Button>
          <Button color="inherit" variant="text">Login</Button>
          <Button color="inherit" variant="text">Sign up</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
