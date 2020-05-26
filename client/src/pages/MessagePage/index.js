import React, { useContext } from "react";
import Title from "../../components/common/Title";
import useInfiniteScrolling from "../../hooks/useInfinteScrolling";
import { getUserConversationsWithPagination } from "../../data/queryConversations";
import { AuthContext } from "../../contexts/AuthContext";
import InfiniteScroll from "react-infinite-scroller";
import Avatar from "../../components/common/Avatar";
import FlexRow from "../../components/common/FlexRow";
import Text from "../../components/common/Text";
import ConversationPreview from "./components/ConversationPreview";

const Messagepage = () => {
  const { currentUser } = useContext(AuthContext);

  const { items, nextPage, count, startFrom } = useInfiniteScrolling({
    perPage: 10,
    query: getUserConversationsWithPagination,
    user: currentUser,
  });

  // const renderChat = (item) => {
  //   return (
  //     <div>
  //       {item.attributes.members.map((user) => {
  //         if (user.id !== currentUser.id) {
  //           return (
  //             <FlexRow key={item.id}>
  //               <Text text={user.attributes.username} />
  //               <Avatar image={user.attributes.profilePicture?.url()} />
  //             </FlexRow>
  //           );
  //         }
  //       })}
  //     </div>
  //   );
  // };

  return (
    <div>
      <Title text="Mensajes"></Title>
      <InfiniteScroll hasMore={startFrom < count} loadMore={nextPage}>
        {items.map((item) => {
          return <ConversationPreview key={item.id} conversation={item} />;
        })}
      </InfiniteScroll>
    </div>
  );
};

export default Messagepage;
