import React from "react";
import Avatar from "../common/Avatar";
import styles from "./index.module.css";
import Text from "../common/Text";
import Moment from "react-moment";
import "moment/locale/es";
import Title from "../common/Title";
import { motion } from "framer-motion";

const Comment = ({ text, user, date, margin, style }) => {
  const createdAt = new Date(date);
  return (
    <motion.div
      animate={{ y: 0 }}
      initial={{ y: 100 }}
      className={styles.container}
      style={{ ...style, margin }}
    >
      <Avatar image={user.attributes.profilePicture?.url()} link={user.id} />
      <div className={styles.dataContainer}>
        <Title text={user.attributes.username} fontSize="16px" />
        <div className={styles.text}>{text}</div>
        <Moment className={styles.date} fromNow locale="es">
          {createdAt}
        </Moment>
      </div>
    </motion.div>
  );
};

Comment.defaultProps = {
  margin: "0px",
};

export default Comment;
