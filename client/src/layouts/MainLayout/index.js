import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./index.module.css";
import NavBar from "../../components/common/NavBar";
import SideBar from "../../components/common/SideBar";

function MainLayout() {
  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles["main-container"]} id="main-scrollable-container">
        <SideBar className={styles["sidebar"]} />

        <div className={styles["content"]}>
          <Outlet />
        </div>
        <div className={styles["right-side-bar"]}>
          <p style={{ marginTop: 10 }}> Ads </p>
          <img
            alt="Ad"
            style={{ marginTop: 20 }}
            width="200"
            src="https://wordstream-files-prod.s3.amazonaws.com/s3fs-public/styles/simple_image/public/images/google-display-ad-example.png?kRkFYA55yxVmhzZfSxNc2feg3ogYUcn9&itok=TXDi_SjK"
          />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
