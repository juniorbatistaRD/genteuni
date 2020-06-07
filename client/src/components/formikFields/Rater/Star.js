import React from "react";
import { ReactComponent as StarSVG } from "../../../assets/icons/star.svg";
import styles from "./Star.module.css";

const Star = ({ isActive, isActiveHalf, willBeActive, isDisabled }) => {
  return (
    <div>
      <StarSVG
        width="25px"
        height="25px"
        className={isActive || willBeActive ? styles.active : styles.disabled}
      />
    </div>
  );
};

export default Star;
