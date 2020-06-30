import React from "react";
import defaultImage from "../../../assets/images/default_avatar.jpg";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";

function Avatar({ image, width, link, ...props }) {
  const classNames = [styles.avatar, props.className].join(" ");
  const navigate = useNavigate();

  const handleClick = () => {
    if (link) {
      navigate(`/app/profile/${link}/`);
    }
  };

  return (
    <div className={styles.container} {...props}>
      <img
        style={{
          width,
          height: width,
          cursor: link ? "pointer" : "auto",
        }}
        src={image ? image : defaultImage}
        className={classNames}
        alt="Profile Avatar"
        onClick={handleClick}
      />
    </div>
  );
}

Avatar.defaultProps = {
  image: defaultImage,
  width: "45px",
  className: " ",
};

export default Avatar;
