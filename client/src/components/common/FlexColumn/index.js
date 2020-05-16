import React from "react";
import styles from "./index.module.css";

const FlexColumn = ({ children, margin, className, alignItems, ...props }) => {
  const classNames = [styles.flexColumn, className].join(" ");

  return (
    <div className={classNames} {...props} style={{ margin, alignItems }}>
      {children}
    </div>
  );
};

FlexColumn.defaultProps = {
  className: " ",
  margin: null,
  alignItems: null,
};

export default FlexColumn;
