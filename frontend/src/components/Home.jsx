// import "./homebtn.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
// import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import elecricitygrid from "../assets/home2.jpg";

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
  const ref = useRef(null);
  const [hoveredShow ,setHoveredShow]=useState(null);
  const [hoveredView ,setHoveredView]=useState(null);
  const [hoveredSubagent ,setHoveredSubagent]=useState(null);
  const handleMouseEnterShow = (x) => {
    setHoveredShow(x);
  };

  const handleMouseLeaveShow = () => {
    setHoveredShow(false);
  };
  const handleMouseEnterView = (x) => {
    setHoveredView(x);
  };

  const handleMouseLeaveView = () => {
    setHoveredView(false);
  };
  const handleMouseEnterSubagent = (x) => {
    setHoveredSubagent(x);
  };

  const handleMouseLeaveSubagent = () => {
    setHoveredSubagent(false);
  };

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
  const scrollToBottom = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleClick = () => {
    scrollToBottom();
    setShow(true);
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <div style={{ textAlign: "center" }}>
        <h1>Agent Modelling for Electricity Grid</h1>
        <img
          src={elecricitygrid}
          alt="Electricity Grid"
          style={{ maxWidth: "70%", height: "50%" }}
        />
        <br />
        <button
          className="btnn"
          onClick={handleClick}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: hoveredShow ? "#2f31317d" : "black",
            color: "white",
            borderRadius: "5%",
            margin: "10px",
          }}
          onMouseEnter={() => handleMouseEnterShow(true)}
          onMouseLeave={handleMouseLeaveShow}
        >
          Show Top Level Agents
        </button>
      </div>
      {show && (
        <div ref={ref} style={{ width: "70%", margin: "0 auto" }}>
          <h2 style={{ textAlign: "center" }}>Top Level Agents</h2>

          {topLevelAgents.map((agent) => (
            <Card key={agent.id} variant="outlined" style={cardStyle}>
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
                  {agent.name}
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
                  {agent.description}
                </Typography>
              </CardContent>
              <CardContent style={{ textAlign: "center" }}>
                <Link to={`/agent/${agent.id}`}>
                  <Button
                    className="btnn"
                    variant="contained"
                    style={{
                      margin: "5px",
                      backgroundColor: hoveredView ? "#2f31317d" : "black",
                    }}
                    onMouseEnter={() => handleMouseEnterView(true)}
                    onMouseLeave={handleMouseLeaveView}
                  >
                    View
                  </Button>
                </Link>
                <Link to={`/agent/${agent.id}/subagents`}>
                  <Button
                    className="btnn"
                    variant="contained"
                    style={{
                      margin: "5px",
                      backgroundColor: hoveredSubagent
                        ? "#2f31317d"
                        : "black",
                    }}
                    onMouseEnter={() => handleMouseEnterSubagent(true)}
                    onMouseLeave={handleMouseLeaveSubagent}
                  >
                    {" "}
                    Subagents
                  </Button>
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
