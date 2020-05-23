import React, { useEffect } from "react";
import FlexColumn from "../../../components/common/FlexColumn";
import Title from "../../../components/common/Title";
import { getPostsWithPagination } from "../../../data/queryPosts";
import useInfiniteScrolling from "../../../hooks/useInfinteScrolling";
import InfiniteScroll from "react-infinite-scroller";
import Post from "../../../components/Post";

const PostSection = ({ user }) => {
  const {
    startFrom,
    count,
    items,
    isLoading,
    nextPage,
    reloadData,
  } = useInfiniteScrolling({
    query: getPostsWithPagination,
    user,
    perPage: 10,
  });

  return (
    <FlexColumn>
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
    </FlexColumn>
  );
};

export default PostSection;
