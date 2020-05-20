import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Parse from "parse";
import FaceBookLogo from "../../../assets/icons/facebook-circular-logo.svg";
import styles from "./index.module.css";
import Button from "../../common/Button";
import initFacebook from "../../../helpers/initFacebook";
import { AuthContext } from "../../../contexts/AuthContext";

function FacebookLogin({ className }) {
  const [isLoading, setLoading] = useState(false);
  const { setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    initFacebook();
  }, []);

  const login = async () => {
    setLoading(true);
    try {
      const user = await Parse.FacebookUtils.logIn("user_gender,email");

      //if a new user register and login
      if (!user.existed()) {
        window.FB.api(
          "/me?fields=id, name,email,gender,picture.width(480), permissions",
          async function (response) {
            const facebookImage = await getFacebookImage(
              response.picture.data.url,
              user
            );

            user.set("username", response.id);
            user.set("email", response.email);
            user.set("gender", response.gender);
            user.set("profilePicture", facebookImage);
            user.save().then(() => {
              setCurrentUser(Parse.User.current());
              setLoading(false);
              navigate("/app");
            });
          }
        );
      } else {
        //if user existed login him/her in
        setCurrentUser(Parse.User.current());
      }
    } catch (err) {
      setLoading(false);
      alert(err);
    }
  };

  const getFacebookImage = async (url) => {
    let response = await fetch(url);
    let data = await response.blob();
    let metadata = {
      type: "image/jpeg",
    };

    let file = new File([data], "test.jpg", metadata);

    return new Parse.File("facebookProfileImage.jpg", file, "image/jpg");
  };

  return (
    <Button
      type="button"
      className={`${styles.facebook_button} ${className}`}
      loading={isLoading}
      typeStyle="secondary"
      onClick={login}
    >
      <span>Entrar con FaceBook </span>
      <img
        src={FaceBookLogo}
        alt="Facebook Login"
        className={styles.facebook_logo}
      />
    </Button>
  );
}

export default FacebookLogin;
