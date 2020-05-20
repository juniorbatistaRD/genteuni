import React from "react";
import styles from "./index.module.css";

function Text({ text, fontSize, margin, padding, className }) {
  const classNames = [className, styles.text].join(" ");

  return (
    <p
      className={classNames}
      style={{
        fontSize,
        margin,
        padding
      }}
    >
      {text}
    </p>
  );
}

Text.defaultProps = {
  className: " ",
  text: " ",
  fontSize: "16px"
};

export default Text;
