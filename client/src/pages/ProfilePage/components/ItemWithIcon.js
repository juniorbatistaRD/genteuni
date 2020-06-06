import React from "react";
import styles from "./IteamWithIcon.module.css";

function ItemWithIcon({ IconSVG, text, ...props }) {
  return (
    <div className={styles.infoBox} {...props}>
      <IconSVG className={styles.icon} />
      <span>{text}</span>
    </div>
  );
}

export default ItemWithIcon;
