import React from "react";
import { useField } from "formik";
import styles from "./index.module.css";

function TextArea({ width, padding, className, ...props }) {
  const [field] = useField(props);

  const classNames = [styles.input, className].join(" ");

  return (
    <textarea
      className={classNames}
      style={{
        width,
        padding
      }}
      {...field}
      {...props}
    ></textarea>
  );
}

TextArea.defaultProps = {
  padding: "15px",
  className: " "
};

export default TextArea;
