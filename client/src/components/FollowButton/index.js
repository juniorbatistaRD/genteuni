import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Button from "../common/Button";
import { saveFollow, isFollowed, deleteFollow } from "../../data/queryFollows";

const FollowButton = ({ userToFollow }) => {
  const { currentUser } = useContext(AuthContext);
  const [isUserFollowed, setIsUserFollowed] = useState();

  useEffect(() => {
    isFollowed(currentUser, userToFollow).then((result) => {
      setIsUserFollowed(result);
    });
  }, [currentUser, userToFollow]);

  const follow = () => {
    saveFollow(userToFollow).then(() => setIsUserFollowed(true));
  };

  const unFollow = () => {
    deleteFollow(currentUser, userToFollow).then(() =>
      setIsUserFollowed(false)
    );
  };

  return (
    <>
      {currentUser &&
        currentUser.id !== userToFollow.id &&
        (isUserFollowed ? (
          <Button
            onClick={unFollow}
            padding="5px 15px"
            margin="0px 10px"
            typeStyle="secondary"
          >
            Siguiendo
          </Button>
        ) : (
          <Button onClick={follow} padding="5px 15px" margin="0px 10px">
            Seguir
          </Button>
        ))}
    </>
  );
};

export default FollowButton;
