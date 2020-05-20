import React from "react";
import styles from "./H.module.css";

const H = ({ element }) => {
  const renderHeader = (element) => {
    switch (element.data.level) {
      case 1:
        return <h1 className={styles.H}> {element.data.text}</h1>;
      case 2:
        return <h2 className={styles.H}> {element.data.text}</h2>;
      case 3:
        return <h3 className={styles.H}> {element.data.text}</h3>;
      case 4:
        return <h4 className={styles.H}> {element.data.text}</h4>;
      case 5:
        return <h5 className={styles.H}> {element.data.text}</h5>;
      case 6:
        return <h6 className={styles.H}> {element.data.text}</h6>;

      default:
        return <h1 className={styles.H}> {element.data.text}</h1>;
    }
  };

  return <>{renderHeader(element)}</>;
};

export default H;
