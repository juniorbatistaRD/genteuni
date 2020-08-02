import React from "react";
import FlexRow from "../../../components/common/FlexRow";
import Avatar from "../../../components/common/Avatar";
import Text from "../../../components/common/Text";
import MessageButton from "../../../components/MessageButton";
import styles from "./JobApplicationItem.module.css";

const JobApplicationItem = ({ user, job }) => {
  console.log(user);
  return (
    <FlexRow
      justifyContent="space-between"
      alignItems="center"
      className={styles.container}
    >
      <Avatar image={user.attributes.profilePicture?.url()} link={user.id} />
      <Text text={user.attributes.username} />
      <FlexRow>
        <MessageButton
          toUser={user}
          pretext={`¡ Hola ! Te escribo porque aplicaste para este trabajo '${job.attributes.title}'. ¿Estas disponible? `}
        />
      </FlexRow>
    </FlexRow>
  );
};
export default JobApplicationItem;
