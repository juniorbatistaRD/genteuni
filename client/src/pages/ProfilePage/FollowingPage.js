import React from "react";
import Title from "../../components/common/Title";
import GoBackButton from "../../components/GoBackButton";
import FlexColumn from "../../components/common/FlexColumn";
import FlexRow from "../../components/common/FlexRow";
import useInfiniteScrolling from "../../hooks/useInfinteScrolling";
import { getUserFollowingsWithPagination } from "../../data/queryFollows";
import InfiniteScroll from "react-infinite-scroller";
import UserListItem from "./components/UserListItem";
import { ReactComponent as EmptyIlustration } from "../../assets/images/empty.svg";
import styles from "./FollowingPage.module.css";

const FollowingPage = ({ user }) => {
  const { count, items, isLoading, startFrom, nextPage } = useInfiniteScrolling(
    {
      query: getUserFollowingsWithPagination,
      perPage: 10,
      user,
    }
  );

  return (
    <FlexColumn margin="10px" className={styles.container}>
      <FlexRow alignItems="center">
        <GoBackButton />
        <Title text="Siguiendo" />
      </FlexRow>

      {isLoading ? (
        "Cargando"
      ) : (
        <InfiniteScroll
          hasMore={startFrom + 10 < count}
          loadMore={nextPage}
          loader={"Cargando..."}
        >
          {items.map((item, index) => (
            <UserListItem key={item.id} user={item.attributes.toUser} />
          ))}
        </InfiniteScroll>
      )}

      {count < 1 && !isLoading && (
        <FlexColumn margin="auto" alignItems="center">
          <Title text="Nadie sigue este usuario. Que sad! 😥" fontSize="16px" />
          <EmptyIlustration width="200px" height="200px" />
        </FlexColumn>
      )}
    </FlexColumn>
  );
};

export default FollowingPage;
