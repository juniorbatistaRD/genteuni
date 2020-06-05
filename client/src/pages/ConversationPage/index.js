import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMessagesWithPagination } from "../../data/queryMessages";
import FlexColumn from "../../components/common/FlexColumn";
import FlexRow from "../../components/common/FlexRow";
import { getConversationById } from "../../data/queryConversations";
import { AuthContext } from "../../contexts/AuthContext";
import GoBackButton from "../../components/GoBackButton";
import Title from "../../components/common/Title";
import styles from "./index.module.css";
import SendMessageForm from "./components/SendMessageForm";
import useInfiniteScrolling from "../../hooks/useInfinteScrolling";
import InfiniteScroll from "react-infinite-scroller";
import Message from "./components/Message";
import Parse from "parse";

const ConversationPage = () => {
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [fromUser, setFromUser] = useState();
  const [currentConversation, setCurrentConversation] = useState();
  const navigate = useNavigate();

  const {
    items,
    nextPage,
    startFrom,
    count,
    reloadData,
  } = useInfiniteScrolling({
    query: getMessagesWithPagination,
    queryData: id,
    perPage: 10,
  });

  //getMessages and mark them as seen
  useEffect(() => {
    const getData = async () => {
      const conversation = await getConversationById(id);
      const fromUser = conversation.attributes.members.filter(
        (member) => member.id !== currentUser.id
      );

      setFromUser(await fromUser[0].fetch());
      setCurrentConversation(conversation);

      Parse.Cloud.run("readAllMessages", { conversation: conversation.id });

      setIsLoading(false);
    };
    getData();
  }, [id, currentUser.id]);

  return (
    <FlexColumn className={styles.container}>
      <>
        <FlexRow alignItems="center" className={styles.header}>
          <GoBackButton />
          {!isLoading && (
            <Title
              text={fromUser.attributes.username}
              onClick={() => navigate("/app/profile/" + fromUser.id)}
            />
          )}
        </FlexRow>
        <div className={styles.messagesContainer}>
          <InfiniteScroll
            className={styles.scroller}
            hasMore={startFrom < count}
            loadMore={nextPage}
            useWindow={false}
            isReverse={true}
          >
            {items.map((item) => (
              <Message message={item} key={item.id} />
            ))}
          </InfiniteScroll>
        </div>
        {!isLoading && (
          <SendMessageForm
            conversation={currentConversation}
            reloadData={reloadData}
          />
        )}
      </>

      <div />
    </FlexColumn>
  );
};

export default ConversationPage;
