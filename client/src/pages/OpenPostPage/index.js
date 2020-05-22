import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Title from "../../components/common/Title";
import Text from "../../components/common/Text";
import Avatar from "../../components/common/Avatar";
import FlexColumn from "../../components/common/FlexColumn";
import FlexRow from "../../components/common/FlexRow";
import { getPostById } from "../../data/queryPosts";
import RenderHTML from "../../components/RenderHTML";
import styles from "./index.module.css";
import Moment from "react-moment";
import "moment/locale/es";
import ShareButtons from "../../components/common/ShareButtons";
import CommentSectionPost from "./CommentSectionPost";
import Spinner from "../../components/common/Spinner";
import ViewsPost from "./components/ViewsPost";
import LikePostButton from "./components/LikePostButton";
import LikesPost from "./components/LikesPost";
import CommentsStatPost from "./components/CommentsStatPost";

function OpenPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true);
      const postData = await getPostById(id);
      setPost(postData);
      setIsLoading(false);
    };
    getPost();
  }, [id]);

  return (
    <FlexColumn className={styles.container}>
      {isLoading ? (
        <>
          <p>Cargando...</p>
          <Spinner />
        </>
      ) : (
        <>
          <FlexColumn className={styles.header}>
            <Title text={post.attributes.title} fontSize="35px" />
            <FlexRow alignItems="center">
              <Moment
                className={styles.date}
                format="MMMM DD, YYYY"
                locale="es"
              >
                {post.attributes.createdAt}
              </Moment>
              <Text text="|" />
              <Avatar
                className={styles.avatar}
                width="25px"
                image={post.attributes.byUser.attributes.profilePicture?.url()}
              />
              <Text text={`@${post.attributes.byUser.attributes.username}`} />
            </FlexRow>
            <FlexRow
              justifyContent="space-around"
              alignItems="center"
              margin="10px"
            >
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
          <FlexColumn className={styles.content}>
            <RenderHTML json={post.attributes} />
          </FlexColumn>
          <FlexRow className={styles.actionButtons}>
            <LikePostButton post={post} />
            <ShareButtons
              url={window.location.hostname}
              title={post.attributes.title}
              text="Encontre esto en Gente Uni"
            />
          </FlexRow>
          <CommentSectionPost post={post} />
        </>
      )}
    </FlexColumn>
  );
}

export default OpenPostPage;
