import React from "react";
import { useField } from "formik";
import styles from "./index.module.css";
import TextareaAutosize from "react-textarea-autosize";

function TextArea({ width, padding, className, minRows, ...props }) {
  const [field] = useField(props);

  const classNames = [styles.input, className].join(" ");

  return (
    <TextareaAutosize
      minRows={minRows}
      className={classNames}
      style={{
        width,
        padding,
      }}
      {...field}
      {...props}
    ></TextareaAutosize>
  );
}

TextArea.defaultProps = {
  padding: "15px",
  className: " ",
  minRows: 1,
};

export default TextArea;
