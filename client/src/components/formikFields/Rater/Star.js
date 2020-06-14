import React from "react";
import { ReactComponent as StarSVG } from "../../../assets/icons/star.svg";
import styles from "./Star.module.css";

const Star = ({ isActive, isActiveHalf, willBeActive, isDisabled, size }) => {
  return (
    <div>
      <StarSVG
        width={size}
        height={size}
        className={isActive || willBeActive ? styles.active : styles.disabled}
      />
    </div>
  );
};

Star.defaultProps = {
  size: "25px",
};

export default Star;
