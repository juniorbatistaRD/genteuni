import React, { useContext } from "react";
import styles from "./index.module.css";
import { AuthContext } from "../../../contexts/AuthContext";
import Avatar from "../Avatar";
import arrowIcon from "../../../assets/icons/arrow.svg";
import homeIcon from "../../../assets/icons/home-run.svg";
import chatIcon from "../../../assets/icons/comment.svg";
import rocketIcon from "../../../assets/icons/start-button.svg";
import schoolIcon from "../../../assets/icons/school.svg";
import questionIcon from "../../../assets/icons/question.svg";
import loveIcon from "../../../assets/icons/love.svg";
import workIcon from "../../../assets/icons/work.svg";
import settingsIcon from "../../../assets/icons/settings.svg";
import SearchBar from "../SearchBar";
import { useNavigate } from "react-router-dom";

function SideBar({ setMenuOpen, className, ...props }) {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const goTo = (link) => {
    navigate(link);
    if (setMenuOpen) {
      setMenuOpen(false);
    }
  };

  return (
    <div className={className}>
      <img
        src={arrowIcon}
        className={styles["close-button"]}
        alt="close"
        onClick={() => {
          setMenuOpen(false);
        }}
      />

      {currentUser && (
        <>
          <Avatar
            width="100px"
            className={styles.avatar}
            image={
              currentUser.get("profilePicture") &&
              currentUser.get("profilePicture").url()
            }
          />
          <span className={styles.username}>
            @{currentUser.attributes.username}
          </span>
        </>
      )}
      <SearchBar className={styles.searchbar} />

      <ul className={styles.menu}>
        <li
          onClick={() => {
            goTo("/app");
          }}
        >
          <img alt="option" className={styles["menu-icon"]} src={homeIcon} />
          <span>Feed</span>
        </li>
        <li>
          <img alt="option" className={styles["menu-icon"]} src={rocketIcon} />
          <span>Descubre</span>
        </li>
        <li>
          <img alt="option" className={styles["menu-icon"]} src={chatIcon} />
          <span>Chat Global</span>
        </li>

        <li
          onClick={() => {
            goTo("/app/schools");
          }}
        >
          <img alt="option" className={styles["menu-icon"]} src={schoolIcon} />
          <span>Escuelas</span>
        </li>
        <li
          onClick={() => {
            goTo("/app/question/");
          }}
        >
          <img
            alt="option"
            className={styles["menu-icon"]}
            src={questionIcon}
          />
          <span>Pregunta</span>
        </li>
        <li>
          <img alt="option" className={styles["menu-icon"]} src={loveIcon} />
          <span>UniCrush</span>
        </li>
        <li
          onClick={() => {
            goTo("/app/job/");
          }}
        >
          <img alt="option" className={styles["menu-icon"]} src={workIcon} />
          <span>Trabajos</span>
        </li>
      </ul>

      <div className={styles.footer}>
        <div
          className={styles["settingsOption"]}
          onClick={() => {
            goTo("/app/settings");
          }}
        >
          <img
            alt="option"
            className={styles["menu-icon"]}
            src={settingsIcon}
          />
          <span>Adjustes</span>
        </div>
        <span>Contactanos!</span>
      </div>
    </div>
  );
}

SideBar.defaultProps = {
  className: styles.container,
};

export default SideBar;
