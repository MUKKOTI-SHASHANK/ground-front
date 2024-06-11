import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../App.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const Home = () => {
  const navigate = useNavigate();
  Axios.defaults.withCredentials = true;  
  useEffect(() => {
    Axios.get("https://ground-improvement-backend.onrender.com/auth/verify").then((res) => {
      console.log("res", res);
      if (res.data.status) {
        console.log("res.body", res.body);
      } else {
        navigate("/login");
      }
    });
  }, [navigate]);

  const [grainSize, setGrainSize] = useState(0);
  const [area, setArea] = useState(0);
  const [commonTechniques, setCommonTechniques] = useState([]);

  //   return <div>Home</div>;

  const classifyMaterials = () => {
    Axios.get(`https://ground-improvement-backend.onrender.com/auth/classify`, {
      params: { grainSize, area },
    })
      .then((response) => {
        console.log("res classify", response);
        const data = response.data;
        if (Array.isArray(data.commonTechniques)) {
          setCommonTechniques(data.commonTechniques);
        } else {
          setCommonTechniques([]);
        }
      })
      .catch((error) => console.error("Error classifying materials:", error));
  };

  const handleSignOut = () => {
    Axios.get("https://ground-improvement-backend.onrender.com/auth/signout")
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.log("signout error", err);
      });
  };
  return (
    <div className="Home-Main">
      <h1>Ground Improvement Techniques</h1>

      <TextField
        className="textField"
        label="Grain Size Distribution (mm)"
        type="number"
        value={grainSize}
        style={{
          margin: "5px",
          width: "50%",
        }}
        onChange={(e) => setGrainSize(parseFloat(e.target.value))}
      />

      <TextField
        className="textField"
        label="Area of Treatment (m^2)"
        type="number"
        value={area}
        style={{
          margin: "5px",
          width: "50%",
        }}
        onChange={(e) => setArea(parseFloat(e.target.value))}
      />

      <Button
        className="classify_button"
        variant="contained"
        style={{
          margin: "5px",
          width: "50%",
        }}
        onClick={classifyMaterials}
      >
        Classify
      </Button>

      <h2>Best Ground Improvement Techniques:</h2>
      <div className="technique-cards">
        {commonTechniques ? (
          commonTechniques.map((technique, index) => (
            <Card key={index} className="technique-card">
              <CardContent>
                <Typography variant="body1" component="p">
                  {technique}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No techniques found</p>
        )}
      </div>
      <div className="sign-out-button">
        <IconButton onClick={handleSignOut}>
          <ExitToAppIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Home;
