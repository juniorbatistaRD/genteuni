import React from "react";
import styles from "./Stat.module.css";

function Stat({ number, text, className, ...props }) {
  const classNames = [styles.container, className].join(" ");

  return (
    <div className={classNames} {...props}>
      <span className={styles.number}>{number}</span>
      <span className={styles.name}>{text}</span>
    </div>
  );
}

export default Stat;
