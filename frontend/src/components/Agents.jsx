import  { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";



const cardStyle = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

function Agents() {
  const [agents, setAgents] = useState([]);
  const [hoveredViewButton, setHoveredViewButton] = useState(null);
  const [hoveredSubagentsButton, setHoveredSubagentsButton] = useState(null);

  const handleMouseEnterView = (agentId) => {
    setHoveredViewButton(agentId);
  };

  const handleMouseLeaveView = () => {
    setHoveredViewButton(null);
  };

  const handleMouseEnterSubagents = (agentId) => {
    setHoveredSubagentsButton(agentId);
  };

  const handleMouseLeaveSubagents = () => {
    setHoveredSubagentsButton(null);
  };

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
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
    >
      <div style={{ width: "70%" }}>
        <h2 style={{ textAlign: "center" }}>All Agents</h2>
        <Grid container spacing={4}>
          {agents.map((agent) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={agent.id}>
              <Card variant="outlined" style={cardStyle}>
                <CardContent>
                  <Typography
                    variant="h4"
                    component="div"
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.4rem",
                      textAlign: "center",
                      maxWidth: "auto",
                    }}
                  >
                    {agent.name}
                  </Typography>
                  <Typography
                    variant="h5"
                    component="div"
                    style={{ fontSize: "1.2rem" }}
                  >
                    {agent.description}
                  </Typography>
                </CardContent>
                <CardContent style={{ textAlign: "center" }}>
                  <Link to={`/agent/${agent.id}`}>
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor:
                          hoveredViewButton === agent.id
                            ? "#2f31317d"
                            : "black",
                      }}
                      onMouseEnter={() => handleMouseEnterView(agent.id)}
                      onMouseLeave={handleMouseLeaveView}
                    >
                      View
                    </Button>
                  </Link>
                  <Link to={`/agent/${agent.id}/subagents`}>
                    <Button
                      variant="contained"
                      style={{
                        margin: "10px",
                        backgroundColor:
                          hoveredSubagentsButton === agent.id
                            ? "#2f31317d"
                            : "black",
                      }}
                      onMouseEnter={() => handleMouseEnterSubagents(agent.id)}
                      onMouseLeave={handleMouseLeaveSubagents}
                    >
                      Subagents
                    </Button>
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
