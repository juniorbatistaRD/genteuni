import React from "react";
import styles from "./HeaderSchool.module.css";

const HeaderSchool = ({ text }) => {
  return (
    <div className={styles.container}>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default HeaderSchool;
