import  { useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import { createTheme, ThemeProvider } from "@mui/material/styles";


const theme = createTheme({
  palette: {
    black: {
      main: "#000",
      light: "#000",
      dark: "#000",
      contrastText: "#000",
    },
  },
});
const cardStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  borderColor: "black",
};

const contentStyle = {
  width: "300px",
  textAlign: "center",
  borderColor: "black",
};

const fieldStyle = {
  marginBottom: '20px',
  borderColor:"black"
};

function AddAgent() {
  let {id} =useParams();
  const [agentDetails, setAgentDetails] = useState({
    name: '',
    description: '',
    property2: '',
    property3: '',
    parentId: id,
    subAgents:[],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAgentDetails({ ...agentDetails, [name]: value });
    
  };

  const handleAddAgent = () => {
    axios.post('http://localhost:3000/agents', agentDetails)
      .then(res => {
        console.log('Agent added:', res.data);
        window.location = `/agent/${id}/subagents`;
      })
      .catch(error => {
        console.error(error);
      });

  };
   const [hoveredAddagentButton, setHoveredAddagentButton] = useState(null);
  const handleMouseEnterAdd = (x) => {
    setHoveredAddagentButton(x);
  };

  const handleMouseLeaveAdd = () => {
    setHoveredAddagentButton(false);
  };
  return (
    <ThemeProvider theme={theme}>
      <div style={cardStyle}>
        <Card variant="outlined">
          <CardContent style={contentStyle}>
            <h2>Add Agent</h2>
            <div style={fieldStyle}>
              <TextField
                label="Name"
                name="name"
                color="black"
                value={agentDetails.name}
                onChange={handleInputChange}
                style={{ borderColor: "black" }}
                fullWidth
              />
            </div>
            <div style={fieldStyle}>
              <TextField
                label="Description"
                name="description"
                color="black"
                value={agentDetails.description}
                onChange={handleInputChange}
                fullWidth
              />
            </div>
            <div style={fieldStyle}>
              <TextField
                label="Property 2"
                name="property2"
                color="black"
                value={agentDetails.property2}
                onChange={handleInputChange}
                fullWidth
              />
            </div>
            <div style={fieldStyle}>
              <TextField
                label="Property 3"
                name="property3"
                color="black"
                value={agentDetails.property3}
                onChange={handleInputChange}
                fullWidth
              />
            </div>
            <Button
              variant="contained"
              onClick={handleAddAgent}
              style={{
                margin: "5px",
                backgroundColor: hoveredAddagentButton ? "#2f31317d" : "black",
              }}
              fullWidth
              onMouseEnter={() => handleMouseEnterAdd(true)}
              onMouseLeave={handleMouseLeaveAdd}
            >
              Add Agent
            </Button>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
}

export default AddAgent;
