import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const cardStyle = {
  marginBottom: "20px",
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

function Home() {
  const [topLevelAgents, setTopLevelAgents] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/agents?parentId=null")
      .then((res) => {
        setTopLevelAgents(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div style={{ marginTop: "50px" }}>
      <div style={{ textAlign: "center" }}>
        <h1>Agent Modelling for Electricity Grid</h1>
        <img
          src="https://c8.alamy.com/comp/H3MMEC/smart-grid-concept-industrial-and-smart-grid-devices-in-a-connected-H3MMEC.jpg"
          alt="Electricity Grid"
          style={{ maxWidth: "100%", height: "auto" }}
        />
        <br />
        <button
          onClick={() => setShow(true)}
          style={{ marginTop: "20px", padding: "10px 20px" }}
        >
          Show Top Level Agents
        </button>
      </div>
      {show && (
        <div style={{ width: "70%", margin: "0 auto" }}>
          <h2 style={{ textAlign: "center" }}>Top Level Agents</h2>

          {topLevelAgents.map((agent) => (
            <Card variant="outlined" style={cardStyle}>
              <CardContent>
                <Typography
                  variant="h4"
                  component="div"
                  style={{ fontWeight: "bold" }}
                >
                  {agent.name}
                </Typography>
                <Typography variant="h5" component="div">
                  {agent.description}
                </Typography>
              </CardContent>
              <CardContent style={{ textAlign: "center" }}>
                <Link to={`/agent/${agent.id}`}>
                  <Button variant="contained">Subagents</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
