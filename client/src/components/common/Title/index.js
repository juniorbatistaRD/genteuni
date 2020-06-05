import React from "react";
import styles from "./index.module.css";

function Title({ text, fontSize, margin, typeStyle, className, ...props }) {
  const classNames = [styles[typeStyle], className].join(" ");

  return (
    <h2
      className={classNames}
      style={{
        fontSize,
        margin,
      }}
      {...props}
    >
      {text}
    </h2>
  );
}

Title.defaultProps = {
  className: " ",
  text: " ",
  fontSize: null,
  typeStyle: "primary",
};

//can be primary or secondary

export default Title;
