import React from "react";
import FlexColumn from "../common/FlexColumn";
import Title from "../common/Title";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";

const Post = ({ post }) => {
  const navigate = useNavigate();
  return (
    <FlexColumn
      className={styles.container}
      onClick={() => navigate("/app/post/" + post.id)}
    >
      <Title text={post.attributes.title} />
    </FlexColumn>
  );
};

export default Post;
