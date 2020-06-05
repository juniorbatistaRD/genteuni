import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import FlexRow from "../../../components/common/FlexRow";
import Avatar from "../../../components/common/Avatar";
import Text from "../../../components/common/Text";
import styles from "./ConversationPreview.module.css";
import { useNavigate } from "react-router-dom";
import { getLastUnreadMessage } from "../../../data/queryMessages";

const ConversationPreview = ({ conversation }) => {
  const { currentUser } = useContext(AuthContext);
  const [fromUser, setFromUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [messagesAmount, setMessagesAmount] = useState(0);

  //getUser
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

  //get messages amount
  useEffect(() => {
    const getData = async () => {
      const result = await getLastUnreadMessage(conversation, currentUser);

      setMessagesAmount(result);
    };

    getData();
  }, [conversation, currentUser]);

  return (
    <FlexRow
      className={styles.container}
      alignItems="center"
      onClick={() => navigate("/chat/" + conversation.id)}
    >
      {!isLoading && (
        <>
          <Avatar image={fromUser.attributes.profilePicture?.url()} />
          <Text
            text={fromUser.attributes.username}
            style={{ fontWeight: messagesAmount > 0 ? "bold" : 100 }}
          />
          {messagesAmount > 0 && (
            <p className={styles.circle}>{messagesAmount}</p>
          )}
        </>
      )}
    </FlexRow>
  );
};

export default ConversationPreview;
