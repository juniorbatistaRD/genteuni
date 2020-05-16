import React from "react";
import { useField } from "formik";
import styles from "./index.module.css";

function RadioField({ className, typeStyle, children, ...props }) {
  const [field] = useField({
    ...props,
    type: "radio"
  });

  const classes = [
    className,
    styles[typeStyle],
    field.checked && typeStyle === "borderLines"
      ? styles.borderLinesSelected
      : " "
  ].join(" ");

  return (
    <div className={classes}>
      <label>
        <input type="radio" {...field} {...props} />
        {children}
      </label>
    </div>
  );
}

RadioField.defaultProps = {
  className: "",
  typeStyle: ""
};

export default RadioField;
