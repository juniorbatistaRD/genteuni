import React, { useEffect } from "react";
import styles from "./index.module.css";
import Button from "../../components/common/Button";
import usePushNotifications from "../../hooks/usePushNotification";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const askForPermissioToReceiveNotifications = usePushNotifications();
  const navigate = useNavigate();

  useEffect(() => {
    askForPermissioToReceiveNotifications();
  }, [askForPermissioToReceiveNotifications]);

  return (
    <div className={styles.container}>
      <span>HomePage</span>

      <Button
        onClick={() => {
          navigate("/app/post");
        }}
      >
        Send
      </Button>
    </div>
  );
}

export default HomePage;
