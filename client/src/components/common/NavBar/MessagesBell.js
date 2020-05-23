import React from "react";
import styles from "./MessagesBell.module.css";
import bellImg from "../../../assets/icons/message.svg";
import { useNavigate } from "react-router-dom";

function MessagesBell() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate("/app/message");
      }}
    >
      <img className={styles.message} src={bellImg} alt="Messages" />
    </div>
  );
}

export default MessagesBell;
