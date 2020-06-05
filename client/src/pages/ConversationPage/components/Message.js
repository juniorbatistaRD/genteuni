import React, { useContext } from "react";
import styles from "./Message.module.css";
import { AuthContext } from "../../../contexts/AuthContext";
import * as moment from "moment";
import "moment/locale/es";
import FlexColumn from "../../../components/common/FlexColumn";
import Text from "../../../components/common/Text";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);

  const classnamesContainer = [
    styles.container,
    message.attributes.createdBy.id === currentUser.id
      ? styles.right
      : styles.left,
  ].join(" ");

  const classnamesBox = [
    styles.box,
    message.attributes.createdBy.id === currentUser.id
      ? styles.white
      : styles.blue,
  ].join(" ");

  return (
    <FlexColumn className={classnamesContainer}>
      <div className={classnamesBox}>
        <p>{message.attributes.message}</p>
      </div>
      <Text
        fontSize="12px"
        text={moment(message.attributes.createdAt).fromNow()}
      />
    </FlexColumn>
  );
};

export default Message;
