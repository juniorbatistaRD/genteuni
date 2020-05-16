import React from "react";
import styles from "./IteamWithIcon.module.css";

function ItemWithIcon({ IconSVG, text }) {
  return (
    <div className={styles.infoBox}>
      <IconSVG className={styles.icon} />
      <span>{text}</span>
    </div>
  );
}

export default ItemWithIcon;
