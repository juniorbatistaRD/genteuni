import React, { useContext } from "react";
import Title from "../../components/common/Title";
import useInfiniteScrolling from "../../hooks/useInfinteScrolling";
import { getUserConversationsWithPagination } from "../../data/queryConversations";
import { AuthContext } from "../../contexts/AuthContext";
import InfiniteScroll from "react-infinite-scroller";

import ConversationPreview from "./components/ConversationPreview";

const Messagepage = () => {
  const { currentUser } = useContext(AuthContext);

  const { items, nextPage, count, startFrom } = useInfiniteScrolling({
    perPage: 10,
    query: getUserConversationsWithPagination,
    user: currentUser,
  });

  return (
    <div>
      <Title text="Conversaciones"></Title>
      <InfiniteScroll hasMore={startFrom < count} loadMore={nextPage}>
        {items.map((item) => {
          return <ConversationPreview key={item.id} conversation={item} />;
        })}
      </InfiniteScroll>
    </div>
  );
};

export default Messagepage;
