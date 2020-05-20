import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import WelcomeInfo from "./WelcomeInfo";
import AuthSection from "./AuthSection";
import { AuthContext } from "../../contexts/AuthContext";

function LandPage() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser !== null) {
      navigate("/app");
    }
  }, [currentUser, navigate]);

  return (
    <div className={styles.container}>
      <WelcomeInfo />
      <AuthSection />
    </div>
  );
}

export default LandPage;
