import React from "react";
import { ReactComponent as SecondIcon } from "./2.svg";
import { ReactComponent as FirstIcon } from "./1.svg";
import { ReactComponent as ThirdIcon } from "./3.svg";
import Text from "../Text";
import styles from "./index.module.css";

const RankingNumber = ({ number }) => {
  const getIcon = (number) => {
    switch (number) {
      case 1:
        return <FirstIcon width="55px" height="55px" />;
      case 2:
        return <SecondIcon width="55px" height="55px" />;
      case 3:
        return <ThirdIcon width="55px" height="55px" />;
      default:
        return <Text text={number} fontSize="22px" />;
    }
  };

  return <div className={styles.container}>{getIcon(number)}</div>;
};

export default RankingNumber;
