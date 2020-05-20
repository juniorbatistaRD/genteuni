import React from "react";
import styles from "./P.module.css";
import { Markup } from "interweave";

const P = ({ element }) => {
  return (
    <div className={styles.P}>
      <Markup
        content={element.data.text}
        allowList={["a", "b", "i", "code"]}
      ></Markup>
    </div>
  );
};

export default P;
