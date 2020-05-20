import React from "react";
import styles from "./CoverImagePreview.module.css";

function CoverImagePreview({ image }) {
  return (
    <div
      className={styles.cover}
      style={{
        backgroundImage: `url(${image})`
      }}
    />
  );
}

CoverImagePreview.defaultProps = {
  image: " "
};

export default CoverImagePreview;
