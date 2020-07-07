import React, { useContext } from "react";
import Title from "../../../components/common/Title";
import FlexColumn from "../../../components/common/FlexColumn";
import CommentPostForm from "../components/CommentPostForm";
import useInfiniteScrolling from "../../../hooks/useInfinteScrolling";
import InfiniteScroll from "react-infinite-scroller";
import { getCommentsWithPagination } from "../../../data/queryPostComment";
import Comment from "../../../components/Comment";
import { AuthContext } from "../../../contexts/AuthContext";
import Text from "../../../components/common/Text";
import { ReactComponent as EmptyIlustration } from "../../../assets/images/empty.svg";

const CommentSectionPost = ({ post }) => {
  const {
    count,
    items,
    isLoading,
    startFrom,
    nextPage,
    reloadData,
  } = useInfiniteScrolling({
    query: getCommentsWithPagination,
    perPage: 10,
    queryData: post,
  });

  const { currentUser } = useContext(AuthContext);

  return (
    <div>
      <Title text="Comentarios" />
      {currentUser ? (
        <CommentPostForm post={post} reloadData={reloadData} />
      ) : (
        <Text text="Inicia Sesion o Registrate para poder comentar" />
      )}
      {isLoading ? (
        "Cargando"
      ) : (
        <InfiniteScroll
          hasMore={startFrom + 10 < count}
          loadMore={nextPage}
          loader={"Cargando..."}
        >
          {items.map((item, index) => (
            <Comment
              key={item.id}
              margin="15px 0px "
              date={item.attributes.createdAt}
              user={item.attributes.createdBy}
              text={item.attributes.text}
            />
          ))}
        </InfiniteScroll>
      )}
      {count < 1 && !isLoading && (
        <FlexColumn margin="auto" alignItems="center">
          <EmptyIlustration width="200px" height="200px" />
          <Title text="No hay Comentarios" fontSize="16px" />
        </FlexColumn>
      )}
    </div>
  );
};

export default CommentSectionPost;
