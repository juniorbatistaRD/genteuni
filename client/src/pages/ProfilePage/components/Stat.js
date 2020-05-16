import React from "react";
import styles from "./Stat.module.css";

function Stat({ number, text, ...props }) {
  return (
    <div className={styles.container} {...props}>
      <span className={styles.number}>{number}</span>
      <span className={styles.name}>{text}</span>
    </div>
  );
}

export default Stat;
