import React, { useContext } from "react";
import Title from "../../components/common/Title";
import useInfiniteScrolling from "../../hooks/useInfinteScrolling";
import { getUserConversationsWithPagination } from "../../data/queryConversations";
import { AuthContext } from "../../contexts/AuthContext";
import InfiniteScroll from "react-infinite-scroller";
import { ReactComponent as EmptyIlustration } from "../../assets/images/empty.svg";
import ConversationPreview from "./components/ConversationPreview";
import styles from "./index.module.css";
import FlexColumn from "../../components/common/FlexColumn";

const Messagepage = () => {
  const { currentUser } = useContext(AuthContext);

  const { items, nextPage, count, startFrom, isLoading } = useInfiniteScrolling(
    {
      perPage: 10,
      query: getUserConversationsWithPagination,
      user: currentUser,
    }
  );

  return (
    <FlexColumn margin="10px" className={styles.container}>
      <Title text="Conversaciones"></Title>
      <InfiniteScroll hasMore={startFrom < count} loadMore={nextPage}>
        {items.map((item) => {
          return <ConversationPreview key={item.id} conversation={item} />;
        })}
      </InfiniteScroll>

      {count < 1 && !isLoading && (
        <FlexColumn alignItems="center" margin="auto">
          <Title text="No tienes mensajes" fontSize="16px" />
          <EmptyIlustration width="200px" height="200px" />
        </FlexColumn>
      )}
    </FlexColumn>
  );
};

export default Messagepage;
