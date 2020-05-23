import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { AuthContext } from "../../contexts/AuthContext";
import { Helmet } from "react-helmet";

function OpenPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true);
      const postData = await getPostById(id);
      setPost(postData);
      setIsLoading(false);
    };
    getPost();
  }, [id]);

  const getTextFromElements = () => {
    const text = [];
    post.attributes.content.blocks.map((element) => {
      return element.data.text ? text.push(element.data.text) : " ";
    });

    return text.join(" ").replace(/<[^>]*>?/gm, "");
  };

  !isLoading && console.log(getTextFromElements());

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
            <Helmet>
              <title>{`${post.attributes.title} - GenteUni`}</title>
              <meta name="description" content={getTextFromElements()} />
            </Helmet>
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
                onClick={() =>
                  navigate("/app/profile/" + post.attributes.byUser.id)
                }
                className={styles.avatar}
                width="25px"
                image={post.attributes.byUser.attributes.profilePicture?.url()}
              />
              <Text
                className={styles.usernameText}
                text={`@${post.attributes.byUser.attributes.username}`}
                onClick={() =>
                  navigate("/app/profile/" + post.attributes.byUser.id)
                }
              />
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
            {currentUser && <LikePostButton post={post} />}
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
