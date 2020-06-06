import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./index.module.css";

const TabsMenu = ({ options }) => {
  return (
    <div className={styles.menu}>
      <ul>
        {options.map((option, index) => (
          <NavLink
            key={index}
            activeClassName={styles.menuOptionActive}
            to={option.link}
            className={styles.menuOption}
          >
            <li>{option.name}</li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default TabsMenu;
