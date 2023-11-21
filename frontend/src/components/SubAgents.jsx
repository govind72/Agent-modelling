import  { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const cardStyle = {
  marginBottom: "20px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

function SubAgents() {
  let { id } = useParams();
  const [subAgents, setSubAgents] = useState([]);
  const [hoveredViewButton, setHoveredViewButton] = useState(null);
  const [hoveredSubagentsButton, setHoveredSubagentsButton] = useState(null);
  const [hoveredAddagentButton,setHoveredAddagentButton]=useState(null);

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
  const handleMouseEnterAdd = (x) => {
    setHoveredAddagentButton(x);
  };

  const handleMouseLeaveAdd = () => {
    setHoveredAddagentButton(false);
  };
  useEffect(() => {
    axios
      .get(`http://localhost:3000/agents/${id}`)
      .then((res) => {
        const agent = res.data;
        Promise.all(
          agent.subAgents.map((subId) =>
            axios.get(`http://localhost:3000/agents/${subId}`)
          )
        )
          .then((subAgentsData) => {
            setSubAgents(subAgentsData.map((res) => res.data));
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Subagents</h2>
      <Grid container spacing={4}>
        {subAgents.map((subAgent) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={subAgent.id}>
            <Card variant="outlined" style={cardStyle}>
              <CardContent>
                <Typography
                  variant="h4"
                  component="div"
                  style={{
                    fontWeight: "bold",
                    textAlign: "center",
                    margin: "10px",
                  }}
                >
                  {subAgent.name}
                </Typography>
                <Typography
                  variant="h5"
                  component="div"
                  style={{
                    textAlign: "center",
                    margin: "10px",
                    fontSize: "1.2rem",
                  }}
                >
                  {subAgent.description}
                </Typography>
              </CardContent>
              <CardContent>
                <Button
                  variant="contained"
                  component={Link}
                  to={`/agent/${subAgent.id}`}
                  style={{
                    margin: "5px",
                    backgroundColor:
                      hoveredViewButton === subAgent.id ? "#2f31317d" : "black",
                  }}
                  onMouseEnter={() => handleMouseEnterView(subAgent.id)}
                  onMouseLeave={handleMouseLeaveView}
                >
                  View
                </Button>
                <Button
                  variant="contained"
                  component={Link}
                  to={`/agent/${subAgent.id}/subagents`}
                  style={{
                    margin: "5px",
                    backgroundColor:
                      hoveredSubagentsButton === subAgent.id
                        ? "#2f31317d"
                        : "black",
                  }}
                  onMouseEnter={() => handleMouseEnterSubagents(subAgent.id)}
                  onMouseLeave={handleMouseLeaveSubagents}
                >
                  View Subagents
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card variant="outlined" style={cardStyle}>
            <CardContent>
              <Typography variant="h6" component="div">
                Add Agent
              </Typography>
            </CardContent>
            <CardContent>
              <Button
                variant="contained"
                component={Link}
                to={{
                  pathname: `/add-agent/${id}`,
                }}
                style={{
                  margin: "5px",
                  backgroundColor: hoveredAddagentButton
                    ? "#2f31317d"
                    : "black",
                }}
                onMouseEnter={() => handleMouseEnterAdd(true)}
                onMouseLeave={handleMouseLeaveAdd}
              >
                Add New Agent
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default SubAgents;
