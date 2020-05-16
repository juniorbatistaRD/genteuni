import React, { useEffect, useState } from "react";
import Stat from "./Stat";
import { getFollowingNumber } from "../../../data/queryFollows";

function Following({ user, ...props }) {
  const [following, setFollowing] = useState();

  useEffect(() => {
    getFollowingNumber(user).then((data) => setFollowing(data));
  }, [user]);

  return (
    <>
      <Stat text="Siguiendo" number={following} {...props}></Stat>
    </>
  );
}

export default Following;
