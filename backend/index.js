const express = require('express');
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Mock data (for demonstration purposes)
let agents = [
  {
    id: 1,
    parentId: null,
    name: 'Agent 1',
    // Other attributes
    subAgents: [2, 3] // Assuming IDs of subagents
  },
  {
    id: 2,
    parentId: 1,
    name: 'Subagent 1',
    // Other attributes
    subAgents: [] // Assuming it has no subagents
  },
  {
    id: 3,
    parentId: 1,
    name: 'Subagent 2',
    // Other attributes
    subAgents: [] // Assuming it has no subagents
  }
];

// Get all agents or top-level agents
app.get('/agents', (req, res) => {
    const { parentId } = req.query;
  
    if (parentId === 'null') {
      const topLevelAgents = agents.filter(agent => agent.parentId === null);
      res.json(topLevelAgents);
    } else {
      res.json(agents);
    }
  });
  
// Get agent by ID
app.get('/agents/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const agent = agents.find(agent => agent.id === id);
  if (agent) {
    res.json(agent);
  } else {
    res.status(404).json({ message: 'Agent not found' });
  }
});

// Update an agent by ID
app.put('/agents/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedAgent = req.body;

  agents = agents.map(agent => {
    if (agent.id === id) {
      return { ...agent, ...updatedAgent };
    }
    return agent;
  });

  res.json({ message: 'Agent updated' });
});

// Create a new agent
app.post('/agents', (req, res) => {
  const newAgent = req.body;
  // In a real scenario, generate a unique ID or use a database's auto-increment feature
  newAgent.id = agents.length + 1;
  agents.push(newAgent);

  res.status(201).json({ message: 'Agent created', agent: newAgent });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});