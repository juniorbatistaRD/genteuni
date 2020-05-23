import React, { useState, useEffect, useContext } from "react";
import Text from "../common/Text";
import FlexRow from "../common/FlexRow";
import { getViewsNumberByPostId, saveView } from "../../data/queryPostView";
import { AuthContext } from "../../contexts/AuthContext";

const ViewsPost = ({ post }) => {
  const [views, setViews] = useState(0);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    getViewsNumberByPostId(post).then((data) => setViews(data));
  }, [post]);

  useEffect(() => {
    if (currentUser && currentUser.id !== post.attributes.byUser.id) {
      saveView(currentUser, post);
    }
  }, [post, currentUser]);

  return (
    <FlexRow>
      <span role="img" aria-label="Eyes">
        👀
      </span>
      <Text text={`Views (${views})`} />
    </FlexRow>
  );
};

export default ViewsPost;
