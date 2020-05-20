import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import Parse from "parse";
import { motion } from "framer-motion";
import styles from "./index.module.css";
import Title from "../../../components/common/Title";
import Button from "../../../components/common/Button";
import initFacebook from "../../../helpers/initFacebook";
import showAlert from "../../../helpers/showAlert/showAlert";
import FlexRow from "../../../components/common/FlexRow";
import GoBackButton from "../../../components/GoBackButton";

function FacebookSettings() {
  const { currentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState();
  const [isUserLinked, setIsUserLink] = useState(
    Parse.FacebookUtils.isLinked(currentUser)
  );

  useEffect(() => {
    initFacebook();
  }, []);

  const unlinkUser = () => {
    setIsLoading(true);
    Parse.FacebookUtils.unlink(currentUser)
      .then(() => {
        showAlert({
          type: "success",
          text: "Tu cuenta ha sido disvinculada de Facebook",
        });
      })
      .catch((err) =>
        showAlert({
          type: "error",
          title: "Uh no",
          text: "Intento fallido, error:" + err,
        })
      )
      .finally(() => {
        setIsLoading(false);
        setIsUserLink(Parse.FacebookUtils.isLinked(currentUser));
      });
  };

  const linkUser = () => {
    setIsLoading(true);
    Parse.FacebookUtils.link(currentUser, "user_gender,email")
      .then(() => {
        showAlert({
          type: "success",
          text: "Tu cuenta ha sido vinculada con Facebook",
        });
      })
      .catch((err) =>
        showAlert({
          type: "error",
          title: "Uh no",
          text: "Intento fallido, error:" + err,
        })
      )
      .finally(() => {
        setIsLoading(false);
        setIsUserLink(Parse.FacebookUtils.isLinked(currentUser));
      });
  };

  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className={styles.container}
    >
      <FlexRow>
        <GoBackButton />
        <Title text="Facebook Login" className={styles.title} />
      </FlexRow>

      <Title
        text={
          isUserLinked
            ? "Puedes desvincular tu cuenta de Facebook"
            : "Puedes vincular tu cuenta para iniciar sesion con facebook"
        }
        typeStyle="secondary"
      />
      <Button
        loading={isLoading}
        onClick={isUserLinked ? unlinkUser : linkUser}
        typeStyle={isUserLinked ? "secondary" : "primary"}
      >
        {isUserLinked ? "Desvincular de Facebook" : "Vincular con Facebook"}
      </Button>
    </motion.div>
  );
}

export default FacebookSettings;
