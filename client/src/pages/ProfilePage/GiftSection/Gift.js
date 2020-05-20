import React from "react";
import styles from "./Gift.module.css";
import Avatar from "../../../components/common/Avatar";
import { motion } from "framer-motion";

const Gift = ({ image, fromUser, text }) => {
  return (
    <motion.div
      animate={{ y: 0 }}
      initial={{ y: 100 }}
      className={styles.container}
    >
      <img src={image} alt="Gift" className={styles.image} />
      <Avatar
        image={fromUser.attributes.profilePicture?.url()}
        className={styles.avatar}
        link={fromUser.id}
      />
      <span className={styles.arrow} />
      <p className={styles.text}>{text}</p>
    </motion.div>
  );
};

export default Gift;
