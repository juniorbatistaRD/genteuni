import React, { useState, useEffect } from "react";
import Title from "../../components/common/Title";
import FlexColumn from "../../components/common/FlexColumn";
import FlexRow from "../../components/common/FlexRow";
import GoBackButton from "../../components/GoBackButton";
import SearchFormSchool from "./components/SearchFormSchool";
import { ReactComponent as RankIcon } from "../../assets/icons/rank.svg";
import SelectCountry from "./components/SelectCountry";
import ReviewsSchoolRanking from "./components/ReviewsSchoolRanking";
import Parse from "parse";

import { queryReview } from "../../data/querySchoolReview";
import query from "../../data/queryMessages";

const SchoolsPages = () => {
  const [country, setCountry] = useState("");

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
        <ReviewsSchoolRanking countryId={country} />
      </FlexColumn>
    </FlexColumn>
  );
};

export default SchoolsPages;
