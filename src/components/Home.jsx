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

  const getInitialState = (key, defaultValue) => {
    const saved = sessionStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  };

  const [grainSize, setGrainSize] = useState(getInitialState("grainSize", ""));
  const [area, setArea] = useState(getInitialState("area", ""));
  const [commonTechniques, setCommonTechniques] = useState(
    getInitialState("commonTechniques", [])
  );

  useEffect(() => {
    const token = localStorage.getItem("token"); // Get the token from local storage
    console.log("token in frontend Home component : ", token);

    if (token) {
      console.log(token);
      Axios.get("https://ground-backend.onrender.com/auth/verify", {
      // Axios.get("http://localhost:5050/auth/verify", {
        headers: { "x-access-token": token }, // Send token in headers
      })
        .then((res) => {
          if (!res.data.status) {
            navigate("/login");
          }
        })
        .catch(() => {
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    // return () => {x
    sessionStorage.setItem("grainSize", JSON.stringify(grainSize));
    sessionStorage.setItem("area", JSON.stringify(area));
    sessionStorage.setItem(
      "commonTechniques",
      JSON.stringify(commonTechniques)
    );
    // };
  }, [grainSize, area, commonTechniques]);

  useEffect(() => {
    const clearStorage = () => {
      sessionStorage.clear();
    };
    window.addEventListener("beforeunload", clearStorage);
    return () => {
      window.removeEventListener("beforeunload", clearStorage);
    };
  }, []);

  useEffect(() => {
    const pingInterval = 15 * 60 * 1000; // 15 minutes in milliseconds

    const pingServer = () => {
      Axios.get("https://ground-backend.onrender.com/auth/health")
        .then((res) => {
          console.log("Health check ping successful:", res.data);
        })
        .catch((err) => {
          console.error("Health check ping failed:", err);
        });
    };
    // Initial ping
    pingServer();

    // Set interval for periodic pings
    const intervalId = setInterval(pingServer, pingInterval);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const classifyMaterials = () => {
    Axios.get(`https://ground-backend.onrender.com/auth/classify`, {
      // Axios.get(`http://localhost:5050/auth/classify`, {
      params: { grainSize, area },
    })
      .then((response) => {
        // console.log("res classify", response);
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
    Axios.get("https://ground-backend.onrender.com/auth/signout")
    // Axios.get("http://localhost:5050/auth/signout")
    
      .then(() => {
        localStorage.removeItem("token"); // Clear token from local storage
        sessionStorage.clear();
        navigate("/login");
      })
      .catch((err) => {
        console.log("signout error", err);
      });
  };

  const handleCardClick = (technique) => {
    const encodedTechnique = technique.replace(/\s+/g, "");
    navigate(`/techniques/${encodedTechnique}`);
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
            <Card
              key={index}
              className="technique-card"
              onClick={() => handleCardClick(technique)}
              style={{ cursor: "pointer" }}
            >
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
        <IconButton onClick={handleSignOut} title="Log-Out">
          <ExitToAppIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Home;
