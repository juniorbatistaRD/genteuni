import React from "react";
import styles from "./List.module.css";
import { Markup } from "interweave";

const List = ({ element }) => {
  return (
    <>
      {element.data.style === "ordered" ? (
        <ol className={styles.list}>
          {element.data.items.map((text, index) => (
            <li key={index}>
              <Markup
                content={text}
                allowList={["a", "b", "i", "code"]}
              ></Markup>
            </li>
          ))}
        </ol>
      ) : (
        <ul className={styles.list}>
          {element.data.items.map((text, index) => (
            <li key={index}>
              <Markup
                content={text}
                allowList={["a", "b", "i", "code"]}
              ></Markup>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default List;
