import React from "react";
import styles from "./UserListItem.module.css";
import FlexRow from "../../../components/common/FlexRow";
import Avatar from "../../../components/common/Avatar";
import Text from "../../../components/common/Text";
import FollowButton from "../../../components/FollowButton";

const UserListItem = ({ user }) => {
  return (
    <FlexRow alignItems="center" className={styles.container}>
      <Avatar image={user.attributes.profilePicture?.url()} link={user.id} />
      <Text text={user.attributes.username} />
      <FlexRow>
        <FollowButton userToFollow={user} />
      </FlexRow>
    </FlexRow>
  );
};

export default UserListItem;
