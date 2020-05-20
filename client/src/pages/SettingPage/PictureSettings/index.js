import React from "react";
import { motion } from "framer-motion";
import styles from "./index.module.css";
import Title from "../../../components/common/Title";
import PictureForm from "./PictureForm";
import FlexRow from "../../../components/common/FlexRow";
import GoBackButton from "../../../components/GoBackButton";

function PictureSetting() {
  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className={styles.container}
    >
      <FlexRow alignItems="center">
        <GoBackButton />
        <Title text="Tu Perfil" className={styles.title} />
      </FlexRow>
      <PictureForm />
    </motion.div>
  );
}

export default PictureSetting;
