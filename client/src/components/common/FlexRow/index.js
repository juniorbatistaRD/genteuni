import React from "react";
import styles from "./index.module.css";

const FlexRow = ({
  children,
  margin,
  alignItems,
  justifyContent,
  className,
  ...props
}) => {
  const classNames = [styles.flexRow, className].join(" ");

  return (
    <div
      className={classNames}
      {...props}
      style={{ margin, alignItems, justifyContent }}
    >
      {children}
    </div>
  );
};

FlexRow.defaultProps = {
  className: " ",
  margin: null,
  alignItems: null,
  justifyContent: null,
};

export default FlexRow;
