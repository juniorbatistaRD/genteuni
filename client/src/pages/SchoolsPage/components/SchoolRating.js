import React from "react";
import RankingNumber from "../../../components/common/RankingNumber";
import FlexRow from "../../../components/common/FlexRow";
import Rater from "../../../components/formikFields/Rater";
import FlexColumn from "../../../components/common/FlexColumn";
import Title from "../../../components/common/Title";
import Text from "../../../components/common/Text";
import { Link } from "react-router-dom";
import styles from "./SchoolRating.module.css";
const SchoolRating = ({ school, avg, number }) => {
  return (
    <FlexColumn margin="0px 0px 20px 0px">
      <FlexRow>
        <RankingNumber number={number} />
        <FlexColumn>
          <FlexRow alignItems="center">
            <Link
              to={"/app/school/" + school.schoolInfo.id}
              className={styles.link}
            >
              <Title text={school.schoolInfo.attributes.name} />
              <Title
                fontSize="16px"
                typeStyle="secondary"
                text={school.schoolInfo.attributes.country.attributes.name}
              />
            </Link>
          </FlexRow>
          <FlexRow>
            <Rater interactive={false} value={avg} size="20px" />
            <Text text={school.avg} />
          </FlexRow>
        </FlexColumn>
      </FlexRow>
    </FlexColumn>
  );
};

export default SchoolRating;
