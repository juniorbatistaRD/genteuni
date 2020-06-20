import React, { useEffect, useState } from "react";
import Parse from "parse";
import FlexColumn from "../../../components/common/FlexColumn";
import Spinner from "../../../components/common/Spinner";
import SchoolRating from "./SchoolRating";

const ReviewsSchoolRanking = () => {
  const [schools, setSchools] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const result = await Parse.Cloud.run("getSchoolRankingList");
      setSchools(result);
      setIsLoading(false);
    };

    getData();
  }, []);

  return (
    <FlexColumn margin={"15px 0px 0px 0px"}>
      {isLoading ? (
        <Spinner />
      ) : (
        schools.map((school, index) => (
          <SchoolRating
            school={school}
            avg={school.avg}
            key={school.objectId}
            number={index + 1}
          />
        ))
      )}
    </FlexColumn>
  );
};

export default ReviewsSchoolRanking;
