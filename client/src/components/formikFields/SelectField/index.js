import React from "react";
import { useField } from "formik";
import styles from "./index.module.css";

function SelectFieldFormik({
  options,
  placeholder,
  isLoading,
  className,
  ...props
}) {
  const [field] = useField(props);
  const classNames = [styles.select, className].join(" ");

  return (
    <select {...field} {...props} className={classNames} disabled={isLoading}>
      {placeholder && <option value="">{placeholder}</option>}

      {options &&
        options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
    </select>
  );
}

function StandaloneSelect({
  options,
  placeholder,
  isLoading,
  className,
  ...props
}) {
  const classNames = [styles.select, className].join(" ");

  delete props.standalone;

  return (
    <select {...props} className={classNames} disabled={isLoading}>
      {placeholder && <option value="">{placeholder}</option>}

      {options &&
        options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
    </select>
  );
}

function SelectField(props) {
  return props.standalone ? (
    <StandaloneSelect {...props} />
  ) : (
    <SelectFieldFormik {...props} />
  );
}

SelectFieldFormik.defaultProps = {
  className: " ",
};

export default SelectField;
