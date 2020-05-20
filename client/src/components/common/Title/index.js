import React from "react";
import styles from "./index.module.css";

function Title({ text, fontSize, margin, typeStyle, className }) {
  const classNames = [styles[typeStyle], className].join(" ");

  return (
    <h2
      className={classNames}
      style={{
        fontSize,
        margin
      }}
    >
      {text}
    </h2>
  );
}

Title.defaultProps = {
  className: " ",
  text: " ",
  fontSize: null,
  typeStyle: "primary"
};

//can be primary or secondary

export default Title;
