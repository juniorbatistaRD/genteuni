import React from "react";
import styles from "./SettingOption.module.css";
import arrowIcon from "../../assets/icons/next.svg";

function SettingOption({ Icon, title, description, onClick }) {
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles["icon-container"]}>
        <Icon className={styles.icon} alt="Menu Option" />
      </div>
      <div className={styles.texts}>
        <span className={styles.title}>{title}</span>
        <span className={styles.description}>{description}</span>
      </div>
      <div className={styles["arrow-container"]}>
        <img src={arrowIcon} className={styles["arrow-icon"]} alt="Go" />
      </div>
    </div>
  );
}

SettingOption.defaultProps = {
  icon: null,
  title: " ",
  description: " ",
  onClick: null
};

export default SettingOption;
