import React, { useEffect, useState } from "react";
import FlexColumn from "../../../components/common/FlexColumn";
import Parse from "parse";
import styles from "./ReviewAvg.module.css";
import Rater from "../../../components/formikFields/Rater";

const ReviewAvg = ({ school }) => {
  const [avg, setAvg] = useState(0);
  const [reviews, setReviews] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const result = await Parse.Cloud.run("getSchoolAverageRating", {
        schoolId: school.id,
      });

      setReviews(result.totalReviews);
      setAvg(result.totalAverage);

      setIsLoading(false);
    };

    getData().catch((e) => console.log(e, "error"));
  }, [school.id]);

  return (
    <FlexColumn className={styles.container}>
      {!isLoading && reviews > 0 && (
        <FlexColumn className={styles.box}>
          <p className={styles.avg}>{avg}</p>
          <Rater interactive={false} value={avg} />
          <p className={styles.text}>{reviews} reviews </p>
        </FlexColumn>
      )}
    </FlexColumn>
  );
};

export default ReviewAvg;
