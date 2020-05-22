import React, { useState, useEffect } from "react";
import Text from "../../../components/common/Text";
import FlexRow from "../../../components/common/FlexRow";
import { getCommentsNumberByPostId } from "../../../data/queryPostComment";

const CommentsStatPost = ({ post }) => {
  const [comments, setComments] = useState();

  useEffect(() => {
    getCommentsNumberByPostId(post).then((data) => setComments(data));
  }, [post]);

  return (
    <FlexRow>
      <span role="img" aria-label="comment">
        📣
      </span>
      <Text text={`Comentarios (${comments})`} />
    </FlexRow>
  );
};

export default CommentsStatPost;
