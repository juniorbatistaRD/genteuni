import React from "react";
import FlexRow from "../../components/common/FlexRow";
import Avatar from "../../components/common/Avatar";
import Text from "../../components/common/Text";
import styles from "./Notification.module.css";
import FlexColumn from "../../components/common/FlexColumn";
import Moment from "react-moment";
import "moment/locale/es";
import { motion } from "framer-motion";

const Comment = ({ notification, content }) => {
  return (
    <FlexRow alignItems="center" className={styles.notification}>
      <Avatar
        image={notification.attributes.triggeredBy.attributes.profilePicture?.url()}
        link={notification.attributes.triggeredBy.id}
      />
      <FlexColumn className={styles.content}>
        <Text text={content} />
        <Moment className={styles.date} fromNow locale="es">
          {notification.attributes.createdAt}
        </Moment>
      </FlexColumn>
    </FlexRow>
  );
};

const DefaultNotification = ({ notification }) => {
  return (
    <FlexRow className={styles.notification}>
      <Text text={notification.attributes?.text} />
      <Moment className={styles.date} fromNow locale="es">
        {notification.attributes.createdAt}
      </Moment>
    </FlexRow>
  );
};

const Notification = ({ notification }) => {
  const renderNotification = (notification) => {
    let text;

    switch (notification.attributes.type) {
      case "PROFILE_COMMENT":
        text = `${notification.attributes.triggeredBy.attributes.username} dejo un comentario en tu perfil: “ ${notification.attributes.text} ”`;
        return <Comment notification={notification} content={text} />;
      case "POST_COMMENT":
        text = `${notification.attributes.triggeredBy.attributes.username} dejo un comentario en tu post: “ ${notification.attributes.text} ”`;
        return <Comment notification={notification} content={text} />;
      case "GIFT":
        text = `${notification.attributes.triggeredBy.attributes.username} te envio un regalo`;
        return <Comment notification={notification} content={text} />;
      case "POST_LIKE":
        text = `${notification.attributes.triggeredBy.attributes.username} le gusto tu post “ ${notification.attributes.text} ”`;
        return <Comment notification={notification} content={text} />;
      case "FOLLOW":
        text = `${notification.attributes.triggeredBy.attributes.username} te empezo a seguir   `;
        return <Comment notification={notification} content={text} />;
      case "QUESTION_ANSWER":
        text = `${notification.attributes.triggeredBy.attributes.username} respondio tu pregunta   `;
        return <Comment notification={notification} content={text} />;
      case "JOB_APPLICATION_RECEIVED":
        text = `${notification.attributes.triggeredBy.attributes.username} aplico para un trabajo que publicaste  `;
        return <Comment notification={notification} content={text} />;

      default:
        return <DefaultNotification notification={notification} />;
    }
  };

  return (
    <motion.div
      animate={{ y: 0 }}
      initial={{ y: 100 }}
      className={styles.container}
    >
      {renderNotification(notification)}
    </motion.div>
  );
};

Notification.defaultProps = {};
// #endregion

export default Notification;
