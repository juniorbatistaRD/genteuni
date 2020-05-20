import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CallToAction.module.css";
import Button from "../../../components/common/Button";

function CallToLogin() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <p>¿Ya tienes cuenta?</p>
      <Button typeStyle="primary" onClick={() => navigate("/")}>
        Inicia Sesion
      </Button>
    </div>
  );
}

export default CallToLogin;
