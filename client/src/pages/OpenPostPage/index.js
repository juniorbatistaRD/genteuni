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
import Button from "../../components/common/Button";
import CommentSectionPost from "./CommentSectionPost";

function OpenPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState([]);
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
        "loading"
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
                <span role="img" aria-label="Eyes">
                  👀
                </span>
                <Text text="Views (0)" />
              </FlexRow>
              <FlexRow alignItems="center">
                <span role="img" aria-label="heart">
                  💙
                </span>
                <Text text="Likes (0)" />
              </FlexRow>
              <FlexRow alignItems="center">
                <span role="img" aria-label="comment">
                  📣
                </span>
                <Text text="Comentarios (0)" />
              </FlexRow>
            </FlexRow>
          </FlexColumn>
          <FlexColumn className={styles.content}>
            <RenderHTML json={post.attributes} />
          </FlexColumn>
        </>
      )}
      <FlexRow className={styles.actionButtons}>
        <Button typeStyle="secondary" padding="5px" margin="10px">
          Dar Like
          <span role="img" aria-label="heart">
            💙
          </span>
        </Button>
        <ShareButtons
          url={window.location.hostname}
          title={post.attributes.title}
          text="Encontre esto en Gente Uni"
        />
      </FlexRow>
      <CommentSectionPost />
    </FlexColumn>
  );
}

export default OpenPostPage;
