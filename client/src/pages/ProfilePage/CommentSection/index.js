import React from "react";
import AddProfileCommentForm from "./AddProfileCommentForm";
import Title from "../../../components/common/Title";
import useProfileComment from "./useProfileComment";
import InfiniteScroll from "react-infinite-scroller";
import styles from "./index.module.css";
import Comment from "../../../components/Comment";
import Text from "../../../components/common/Text";
import { ReactComponent as EmptyIlustration } from "../../../assets/images/empty.svg";

const CommentSection = ({ user }) => {
  const {
    comments,
    isLoading,
    count,
    startFrom,
    fetchMoreComments,
    reloadComments
  } = useProfileComment(user);

  return (
    <>
      <Title text={`Comentarios (${count})`} margin="10px" />
      <AddProfileCommentForm toUser={user} reloadComments={reloadComments} />
      <div className={styles.list}>
        {isLoading ? (
          <div>
            <Text text="Cargando..." />
          </div>
        ) : (
          <InfiniteScroll
            pageStart={startFrom}
            hasMore={startFrom < count}
            loader={"Cargando..."}
            loadMore={() => fetchMoreComments(user)}
          >
            {comments.map(comment => (
              <Comment
                margin="10px"
                key={comment.id}
                text={comment.attributes.text}
                user={comment.attributes.fromUser}
                date={comment.attributes.createdAt}
              />
            ))}
          </InfiniteScroll>
        )}
      </div>

      {count < 1 && !isLoading && (
        <div className={styles.nothingFound}>
          <Title text="Nadie ha comentado aun! 😥" fontSize="16px" />
          <Title text="Se el primero!😎 " fontSize="16px" />
          <EmptyIlustration width="200px" height="200px" />
        </div>
      )}
    </>
  );
};

export default CommentSection;
