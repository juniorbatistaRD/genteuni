import React from "react";
import FlexColumn from "../common/FlexColumn";
import FlexRow from "../common/FlexRow";
import Title from "../common/Title";
import Text from "../common/Text";
import Avatar from "../common/Avatar";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
import CommentsStatPost from "./CommentsStatPost";
import LikesPost from "./LikesPost";
import ViewsPost from "./ViewsPost";
import Moment from "react-moment";
import extractTextFromPost from "../../helpers/extractTextFromPost";

const Post = ({ post }) => {
  const navigate = useNavigate();
  return (
    <FlexColumn
      className={styles.header}
      onClick={() => navigate("/app/post/" + post.id)}
    >
      <Title text={post.attributes.title} fontSize="25px" />
      <FlexRow alignItems="center">
        <Moment className={styles.date} format="MMMM DD, YYYY" locale="es">
          {post.attributes.createdAt}
        </Moment>
        <Text text="|" />
        <Avatar
          onClick={() => navigate("/app/profile/" + post.attributes.byUser.id)}
          className={styles.avatar}
          width="25px"
          image={post.attributes.byUser.attributes.profilePicture?.url()}
        />
        <Text
          className={styles.usernameText}
          text={`@${post.attributes.byUser.attributes.username}`}
          onClick={() => navigate("/app/profile/" + post.attributes.byUser.id)}
        />
      </FlexRow>
      <FlexRow>
        <Text text={extractTextFromPost(post.attributes.content.blocks)} />
      </FlexRow>
      <FlexRow justifyContent="space-around" alignItems="center" margin="10px">
        <FlexRow alignItems="center">
          <ViewsPost post={post} />
        </FlexRow>
        <FlexRow alignItems="center">
          <LikesPost post={post} />
        </FlexRow>
        <FlexRow alignItems="center">
          <CommentsStatPost post={post} />
        </FlexRow>
      </FlexRow>
    </FlexColumn>
  );
};

export default Post;
