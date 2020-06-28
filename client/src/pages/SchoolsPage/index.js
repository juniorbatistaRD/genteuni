import React from "react";
import Title from "../../components/common/Title";
import FlexColumn from "../../components/common/FlexColumn";
import FlexRow from "../../components/common/FlexRow";
import GoBackButton from "../../components/GoBackButton";
import SearchFormSchool from "./components/SearchFormSchool";
import { ReactComponent as RankIcon } from "../../assets/icons/rank.svg";
import ReviewsSchoolRanking from "./components/ReviewsSchoolRanking";

const SchoolsPages = () => {
  return (
    <FlexColumn>
      <FlexRow alignItems="center">
        <GoBackButton />
        <Title text="Escuelas" />
      </FlexRow>

      <FlexRow>
        <SearchFormSchool />
      </FlexRow>

      <FlexColumn>
        <FlexRow>
          <RankIcon width="20px" height="20px" />
          <Title text="Rankings" />
        </FlexRow>
        <Title
          text="Ranking escuelas mejor evaluadas en todos los paises"
          typeStyle="secondary"
        />
        <ReviewsSchoolRanking />
      </FlexColumn>
    </FlexColumn>
  );
};

export default SchoolsPages;
