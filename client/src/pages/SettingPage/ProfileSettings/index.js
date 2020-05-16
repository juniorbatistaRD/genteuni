import React from "react";
import { motion } from "framer-motion";
import styles from "./index.module.css";
import Title from "../../../components/common/Title";
import ProfileForm from "./ProfileForm";
import FlexRow from "../../../components/common/FlexRow";
import GoBackButton from "../../../components/GoBackButton";

function ProfileSetting() {
  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className={styles.container}
    >
      <FlexRow>
        <GoBackButton />
        <Title text="Tu Perfil" className={styles.title} />
      </FlexRow>
      <ProfileForm />
    </motion.div>
  );
}

export default ProfileSetting;
