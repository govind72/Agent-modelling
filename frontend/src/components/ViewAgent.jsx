// AgentDetails.js
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Typography from "@mui/material/Typography";
// import Grid from "@mui/material/Grid";

import CardContent from "@mui/material/CardContent";

import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function AgentDetails() {
  const { id } = useParams();
  const [agent, setAgent] = useState(null);
  const [subAgents, setSubAgents] = useState([]);
  const [hoveredSubagentsButton, setHoveredSubagentsButton] = useState(null);

  
  const handleMouseEnterSubagents = (agentId) => {
    setHoveredSubagentsButton(agentId);
  };

  const handleMouseLeaveSubagents = () => {
    setHoveredSubagentsButton(null);
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
        setAgent(agent); // Set the agent details
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  if (!agent) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Typography
        variant="h4"
        component="div"
        style={{
          fontWeight: "bold",

          margin: "10px",
        }}
      >
        {agent.name}
      </Typography>
      <Typography
        variant="h4"
        component="div"
        style={{
          fontSize: "1.2rem",

          margin: "10px",
        }}
      >
        <b>Description:</b> <br></br>
        {agent.description}
        <br></br>
      </Typography>
      {agent.property2 && (
        <Typography
          variant="h4"
          component="div"
          style={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            margin: "10px",
          }}
        >
          Properties:
        </Typography>
      )}
      <ul>
        {agent.property2 && (
          <li>
            <Typography
              variant="h4"
              component="div"
              style={{
                fontSize: "1.2rem",

                margin: "10px",
              }}
            >
              {agent.property2}
            </Typography>
          </li>
        )}

        {agent.property3 && (
          <li>
            <Typography
              variant="h4"
              component="div"
              style={{
                fontSize: "1.2rem",

                margin: "10px",
              }}
            >
              {agent.property3}
            </Typography>
          </li>
        )}
      </ul>
      {subAgents.length > 0 && (
        <div>
          <Typography
            variant="h4"
            component="div"
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              margin: "10px",
            }}
          >
            Subagents:
          </Typography>
          <ul>
            {subAgents.map((subAgent) => (
              <li key={subAgent.id}>{subAgent.name}</li>
            ))}
          </ul>
        </div>
      )}
      <CardContent>
        <Link to={`/agent/${agent.id}/subagents`}>
          <Button
            variant="contained"
            style={{
              margin: "0px",
              backgroundColor:
                hoveredSubagentsButton === agent.id ? "#2f31317d" : "black",
            }}
            onMouseEnter={() => handleMouseEnterSubagents(agent.id)}
            onMouseLeave={handleMouseLeaveSubagents}
          >
            Subagents
          </Button>
        </Link>
      </CardContent>
    </div>
  );
}

export default AgentDetails;
