import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useParams } from "react-router-dom";
import ProfilePage from "./ProfilePage";
import { getUserById } from "../../data/queryUsers";
import { saveView } from "../../data/queryViews";
import { Routes, Route } from "react-router";
import FollowersPage from "./FollowersPage";
import FollowingPage from "./FollowingPage";

function ProfilePageContainer() {
  const params = useParams();
  const { currentUser } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState();
  const [isloading, setIsloading] = useState(true);

  useEffect(() => {
    const addView = (toUser) => {
      if (currentUser && currentUser.id !== toUser.id) {
        saveView(currentUser, toUser);
      }
    };

    const userToFetch = params.user ? params.user : currentUser.id;
    getUserById(userToFetch).then((user) => {
      setUserInfo(user);
      addView(user);
      setIsloading(false);
    });
  }, [currentUser, params.user]);

  return (
    !isloading && (
      <Routes>
        <Route path="/*" element={<ProfilePage user={userInfo} />}></Route>
        <Route
          path="/followers"
          element={<FollowersPage user={userInfo} />}
        ></Route>
        <Route
          path="/following"
          element={<FollowingPage user={userInfo} />}
        ></Route>
      </Routes>
    )
  );
}

export default ProfilePageContainer;
