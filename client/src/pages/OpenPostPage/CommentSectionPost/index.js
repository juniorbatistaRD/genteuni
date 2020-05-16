import React from "react";
import Title from "../../../components/common/Title";
import CommentPostForm from "../components/CommentPostForm";

const CommentSectionPost = () => {
  return (
    <div>
      <Title text="Comentarios" />
      <CommentPostForm />
      <p>List of comments</p>
    </div>
  );
};

export default CommentSectionPost;
