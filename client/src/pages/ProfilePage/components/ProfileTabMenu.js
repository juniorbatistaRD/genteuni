import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./ProfileTabMenu.module.css";

const ProfileTabMenu = () => {
  return (
    <div className={styles.menu}>
      <ul>
        <NavLink
          activeClassName={styles.menuOptionActive}
          to="./"
          className={styles.menuOption}
        >
          <li>Posts</li>
        </NavLink>
        <NavLink
          activeClassName={styles.menuOptionActive}
          to="comments"
          className={styles.menuOption}
        >
          <li>Comentarios</li>
        </NavLink>
        <NavLink
          activeClassName={styles.menuOptionActive}
          to="gifts"
          className={styles.menuOption}
        >
          <li>Regalos</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default ProfileTabMenu;
