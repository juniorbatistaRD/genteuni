import React from "react";
import styles from "./IteamWithIcon.module.css";

function ItemWithIcon({ IconSVG, text, className = " ", ...props }) {
  const classNames = [styles.infoBox, className].join(" ");
  return (
    <div className={classNames} {...props}>
      <IconSVG className={styles.icon} />
      <span>{text}</span>
    </div>
  );
}

export default ItemWithIcon;
