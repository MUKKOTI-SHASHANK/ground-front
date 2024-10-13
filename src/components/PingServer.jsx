import { useEffect } from "react";
import Axios from "axios";

const PingServer = () => {
  useEffect(() => {
    const pingInterval = 15 * 60 * 1000;

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

    // Cleanup on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return null; // This component does not render anything
};

export default PingServer;
