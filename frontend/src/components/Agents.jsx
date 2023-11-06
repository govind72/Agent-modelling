import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const cardStyle = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

function Agents() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/agents")
      .then((res) => {
        setAgents(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <div style={{ width: '70%' }}>
        <h2 style={{ textAlign: "center" }}>All Agents</h2>
        <Grid container spacing={4}>
          {agents.map((agent) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={agent.id}>
              <Card variant="outlined" style={cardStyle}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {agent.name}
                  </Typography>
                </CardContent>
                <CardContent style={{ textAlign: 'center' }}>
                  <Link to={`/agent/${agent.id}`}>
                    <Button variant="contained">Subagents</Button>
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default Agents;
