import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import styles from "./index.module.css";
import NotificationBell from "./NotificationBell";
import MessagesBell from "./MessagesBell";
import SearchBar from "../SearchBar";
import Logo from "../Logo";
import Avatar from "./../Avatar";
import MenuButton from "../MenuButton";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles["left-side"]}>
        <Logo className={styles.logo} />
        <MenuButton />
      </div>

      <div className={styles["search-bar-container"]}>
        <SearchBar />
      </div>

      <div className={styles["right-side"]}>
        {currentUser ? (
          <>
            <NotificationBell />
            <MessagesBell />
            <Avatar
              onClick={() => navigate("/app/me/")}
              className={styles.avatar}
              image={
                currentUser.get("profilePicture") &&
                currentUser.get("profilePicture").url()
              }
            />
          </>
        ) : (
          <span>Inicia Sesion!</span>
        )}
      </div>
    </div>
  );
}

export default NavBar;
