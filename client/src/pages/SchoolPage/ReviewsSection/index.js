import React from "react";
import Title from "../../../components/common/Title";
import ReviewForm from "./ReviewForm";
import ReviewAvg from "./ReviewAvg";
import { getReviewsWithPagination } from "../../../data/querySchoolReview";
import useInfiniteScrolling from "../../../hooks/useInfinteScrolling";
import InfiniteScroll from "react-infinite-scroller";
import Review from "../../../components/Review";

const ReviewsSection = ({ school }) => {
  const { startFrom, isLoading, items, count, nextPage } = useInfiniteScrolling(
    {
      query: getReviewsWithPagination,
      queryData: school,
      perPage: 10,
    }
  );

  return (
    <div>
      <Title text="Reviews" margin="10px" />
      <ReviewAvg school={school} />
      <ReviewForm school={school} />
      {!isLoading && (
        <InfiniteScroll
          loader={"Cargando"}
          hasMore={startFrom < count}
          loadMore={nextPage}
        >
          {items.map((item) => (
            <Review
              key={item.id}
              rating={item.attributes.rating}
              date={item.attributes.createdAt}
              text={item.attributes.description}
              user={item.attributes.createdBy}
            />
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default ReviewsSection;
