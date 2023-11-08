// AgentDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// import Grid from "@mui/material/Grid";

import CardContent from "@mui/material/CardContent";

import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function AgentDetails() {
  const { id } = useParams();
  const [agent, setAgent] = useState(null);
  const [subAgents, setSubAgents] = useState([]);

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
      <h1>{agent.name}</h1>
      <p>Description: {agent.description}</p>
      {agent.property2 && <p>Property2: {agent.property2}</p>}
      {agent.property3 && <p>Property3: {agent.property3}</p>}
      {subAgents.length > 0 && (
        <div>
          <h2>Subagents:</h2>
          <ul>
            {subAgents.map((subAgent) => (
              <li key={subAgent.id}>{subAgent.name}</li>
            ))}
          </ul>
        </div>
      )}
      <CardContent>
        <Link to={`/agent/${agent.id}/subagents`}>
          <Button variant="contained" style={{ margin: "0px" }}>
            Subagents
          </Button>
        </Link>
      </CardContent>
    </div>
  );
}

export default AgentDetails;
