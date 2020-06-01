import React, { useContext } from "react";
import styles from "./Message.module.css";
import { AuthContext } from "../../../contexts/AuthContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);

  const classnames = [
    styles.container,
    message.attributes.createdBy.id === currentUser.id
      ? styles.right
      : styles.left,
  ].join(" ");

  return (
    <div className={classnames}>
      <p>{message.attributes.message}</p>
    </div>
  );
};

export default Message;
