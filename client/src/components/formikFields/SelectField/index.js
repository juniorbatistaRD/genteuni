import React from "react";
import { useField } from "formik";
import styles from "./index.module.css";

function SelectField({ options, placeholder, isLoading, className, ...props }) {
  const [field] = useField(props);

  const classNames = [styles.select, className].join(" ");

  return (
    <select
      {...field}
      {...props}
      className={classNames}
      placeholder="hi"
      disabled={isLoading}
    >
      {placeholder && <option value="">{placeholder}</option>}

      {options &&
        options.map(option => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
    </select>
  );
}

SelectField.defaultProps = {
  className: " "
};

export default SelectField;
