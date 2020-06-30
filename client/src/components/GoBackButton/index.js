import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ArrowIcon } from "../../assets/icons/left-arrow.svg";
import FlexRow from "../common/FlexRow";
import styles from "./GoBackButton.module.css";

const GoBackButton = () => {
  const navigate = useNavigate();
  return (
    <FlexRow
      onClick={() => navigate(-1)}
      margin="10px"
      alignItems="center"
      className={styles.button}
    >
      <ArrowIcon width="35px" fill="#4875b2" />
    </FlexRow>
  );
};

export default GoBackButton;
