import React from "react";
import FlexColumn from "../../../components/common/FlexColumn";
import Title from "../../../components/common/Title";
import useInfiniteScrolling from "../../../hooks/useInfinteScrolling";
import { getApplicationsWithPagination } from "../../../data/queryJobApplications";
import Text from "../../../components/common/Text";
import InfiniteScroll from "react-infinite-scroller";
import JobApplicationItem from "./JobApplicationItem";
import { ReactComponent as EmptyIlustration } from "../../../assets/images/empty.svg";

const JobApplicationsList = ({ job }) => {
  const { items, count, isLoading, nextPage, startFrom } = useInfiniteScrolling(
    {
      query: getApplicationsWithPagination,
      queryData: job,
      perPage: 10,
    }
  );

  return (
    <FlexColumn>
      <Title text="Aplicaciones" margin="10px" />
      {!isLoading && (
        <InfiniteScroll hasMore={startFrom < count} loadMore={nextPage}>
          {items.map((item) => (
            <JobApplicationItem user={item.attributes.createdBy} job={job} />
          ))}
        </InfiniteScroll>
      )}
      {!isLoading && count < 1 && (
        <FlexColumn alignItems="center" justifyContent="center">
          <EmptyIlustration width="200px" height="200px" />
          <Text text="Nadie ha aplicado aun" />
        </FlexColumn>
      )}
    </FlexColumn>
  );
};

export default JobApplicationsList;
