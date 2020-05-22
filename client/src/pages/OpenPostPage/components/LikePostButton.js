import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import Button from "../../../components/common/Button";
import { saveLike, isPostLiked, deleteLike } from "../../../data/queryPostLike";

const LikePostButton = ({ post }) => {
  const { currentUser } = useContext(AuthContext);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    isPostLiked(currentUser, post).then((result) => {
      setIsLiked(result);
    });
  }, [currentUser, post]);

  const onLike = () => {
    saveLike(currentUser, post).then(() => setIsLiked(true));
  };

  const onDeleteLike = () => {
    deleteLike(currentUser, post).then(() => setIsLiked(false));
  };

  return (
    <Button
      padding="10px"
      margin="10px"
      typeStyle={isLiked ? "secondary" : "primary"}
      onClick={isLiked ? onDeleteLike : onLike}
    >
      {isLiked ? "Te gusto!" : "Enviar Like"}
      <span role="img" aria-label="heart">
        💙
      </span>
    </Button>
  );
};

export default LikePostButton;
