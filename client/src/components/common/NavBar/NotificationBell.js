import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import styles from "./NotificationBell.module.css";
import bellImg from "../../../assets/icons/notification.svg";
import bellWithCircleImg from "../../../assets/icons/notification-with-red-circle.svg";
import { getUnreadNumberOfNotifications } from "../../../data/queryNotifications";

function NotificationBell() {
  const { currentUser } = useContext(AuthContext);
  const [notificationNumber, setNotificationNumber] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const { amount, subscrition } = await getUnreadNumberOfNotifications(
        currentUser
      );
      setNotificationNumber(amount);

      //receive new notifications
      subscrition.on("create", () => setNotificationNumber((prev) => prev + 1));
      //if notificaion was read
      subscrition.on("leave", () => setNotificationNumber((prev) => prev - 1));
    };

    getData();
  }, [currentUser]);

  return (
    <div
      onClick={() => {
        navigate("/app/notifications");
      }}
    >
      <img
        className={styles.bell}
        src={notificationNumber > 0 ? bellWithCircleImg : bellImg}
        alt="Notifications"
      />
    </div>
  );
}

export default NotificationBell;
