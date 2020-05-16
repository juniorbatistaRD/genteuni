import React from "react";
import styles from "./index.module.css";
import { Routes, Route } from "react-router-dom";
import SignUpForm from "../../../components/user/SignUpForm";
import LoginForm from "../../../components/user/LoginForm";
import CallToRegister from "./CallToRegister";
import CallToLogin from "./CallToLogin";
import hello from "../../../assets/images/hello.png";

function AuthSection() {
  return (
    <div className={styles.container}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Title title="Inicia Sesion" />
              <LoginForm />
              <CallToRegister />
            </>
          }
        ></Route>

        <Route
          path="/signup"
          element={
            <>
              <Title title="Registrate" />
              <SignUpForm />
              <CallToLogin />
            </>
          }
        ></Route>
      </Routes>

      <img src={hello} alt="welcome" className={styles.hello} />
    </div>
  );
}

const Title = props => <h2 className={styles.title}> {props.title} </h2>;

export default AuthSection;
