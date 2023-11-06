import React, { useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const cardStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
};

const contentStyle = {
  width: '300px',
  textAlign: 'center',
};

const fieldStyle = {
  marginBottom: '20px',
};

function AddAgent() {
  const [agentDetails, setAgentDetails] = useState({
    name: '',
    property1: '',
    property2: '',
    property3: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAgentDetails({ ...agentDetails, [name]: value });
  };

  const handleAddAgent = () => {
    axios.post('http://localhost:3000/agents', agentDetails)
      .then(res => {
        console.log('Agent added:', res.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div style={cardStyle}>
      <Card variant="outlined">
        <CardContent style={contentStyle}>
          <h2>Add Agent</h2>
          <div style={fieldStyle}>
            <TextField
              label="Name"
              name="name"
              value={agentDetails.name}
              onChange={handleInputChange}
              fullWidth
            />
          </div>
          <div style={fieldStyle}>
            <TextField
              label="Property 1"
              name="property1"
              value={agentDetails.property1}
              onChange={handleInputChange}
              fullWidth
            />
          </div>
          <div style={fieldStyle}>
            <TextField
              label="Property 2"
              name="property2"
              value={agentDetails.property2}
              onChange={handleInputChange}
              fullWidth
            />
          </div>
          <div style={fieldStyle}>
            <TextField
              label="Property 3"
              name="property3"
              value={agentDetails.property3}
              onChange={handleInputChange}
              fullWidth
            />
          </div>
          <Button variant="contained" onClick={handleAddAgent} fullWidth>
            Add Agent
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddAgent;
