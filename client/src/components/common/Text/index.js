import React from "react";
import styles from "./index.module.css";

function Text({ text, fontSize, margin, padding, className, color, ...props }) {
  const classNames = [className, styles.text].join(" ");

  return (
    <p
      className={classNames}
      style={{
        fontSize,
        margin,
        padding,
        color,
      }}
      {...props}
    >
      {text}
    </p>
  );
}

Text.defaultProps = {
  className: " ",
  text: " ",
  color: "#696969",
  fontSize: "16px",
};

export default Text;
