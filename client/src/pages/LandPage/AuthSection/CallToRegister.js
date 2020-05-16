import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CallToAction.module.css";
import Button from "../../../components/common/Button";

function CallToRegister() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <p>¿Aun no tienes cuenta? ¡Registrate!</p>
      <Button typeStyle="primary" onClick={() => navigate("/auth/signup")}>
        Registrate
      </Button>
    </div>
  );
}

export default CallToRegister;
