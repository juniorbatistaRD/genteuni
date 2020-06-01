import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import FlexRow from "../../../components/common/FlexRow";
import Avatar from "../../../components/common/Avatar";
import Text from "../../../components/common/Text";
import styles from "./ConversationPreview.module.css";
import { useNavigate } from "react-router-dom";

const ConversationPreview = ({ conversation }) => {
  const { currentUser } = useContext(AuthContext);
  const [fromUser, setFromUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const fromUser = conversation.attributes.members.filter(
        (member) => member.id !== currentUser.id
      );

      const result = await fromUser[0].fetch();

      setFromUser(result);
      setIsLoading(false);
    };

    getUser();
  }, [conversation.attributes.members, currentUser.id]);

  return (
    <FlexRow
      className={styles.container}
      alignItems="center"
      onClick={() => navigate("/chat/" + conversation.id)}
    >
      {!isLoading && (
        <>
          <Avatar image={fromUser.attributes.profilePicture?.url()} />
          <Text text={fromUser.attributes.username} />
        </>
      )}
    </FlexRow>
  );
};

export default ConversationPreview;
