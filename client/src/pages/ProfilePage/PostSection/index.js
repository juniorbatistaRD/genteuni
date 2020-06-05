import React from "react";
import FlexColumn from "../../../components/common/FlexColumn";
import Title from "../../../components/common/Title";
import { getPostsWithPagination } from "../../../data/queryPosts";
import useInfiniteScrolling from "../../../hooks/useInfinteScrolling";
import InfiniteScroll from "react-infinite-scroller";
import Post from "../../../components/Post";
import { ReactComponent as EmptyIlustration } from "../../../assets/images/empty.svg";

const PostSection = ({ user }) => {
  const { startFrom, count, items, isLoading, nextPage } = useInfiniteScrolling(
    {
      query: getPostsWithPagination,
      user,
      perPage: 10,
    }
  );

  return (
    <>
      <Title text="Publicaciones" margin="10px" />

      {!isLoading && (
        <InfiniteScroll
          start={0}
          loadMore={nextPage}
          hasMore={startFrom < count}
          loader={"Cargando"}
        >
          {items.map((item) => (
            <Post key={item.id} post={item} />
          ))}
        </InfiniteScroll>
      )}

      {count < 1 && !isLoading && (
        <FlexColumn alignItems="center" margin="auto">
          <Title text="No ha publicado nada aun" fontSize="16px" />
          <EmptyIlustration width="200px" height="200px" />
        </FlexColumn>
      )}
    </>
  );
};

export default PostSection;
