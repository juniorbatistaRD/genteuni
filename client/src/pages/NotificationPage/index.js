import React, { useContext, useEffect } from "react";
import Title from "../../components/common/Title";
import { AuthContext } from "../../contexts/AuthContext";
import FlexColumn from "../../components/common/FlexColumn";
import { getUserNotificationsWithPagination } from "../../data/queryNotifications";
import useInfiniteScrolling from "../../hooks/useInfinteScrolling";
import InfiniteScroll from "react-infinite-scroller";
import Notification from "./Notification";
import Text from "../../components/common/Text";
import Parse from "parse";

function NotificationPage() {
  const { currentUser } = useContext(AuthContext);
  const { items, count, isLoading, nextPage, startFrom } = useInfiniteScrolling(
    {
      query: getUserNotificationsWithPagination,
      perPage: 10,
      user: currentUser,
    }
  );

  useEffect(() => {
    Parse.Cloud.run("readAllNotifications", null);
  }, []);

  return (
    <FlexColumn margin="10px">
      <Title text="Notificaciones" />
      {isLoading ? (
        <Text text="Cargando.." />
      ) : (
        <InfiniteScroll loadMore={nextPage} hasMore={startFrom < count}>
          {items.map((item) => (
            <Notification key={item.id} notification={item} />
          ))}
        </InfiniteScroll>
      )}
    </FlexColumn>
  );
}

export default NotificationPage;
