import React from "react";
import FlexColumn from "../../components/common/FlexColumn";
import Title from "../../components/common/Title";
import FlexRow from "../../components/common/FlexRow";
import GoBackButton from "../../components/GoBackButton";
import useInfiniteScrolling from "../../hooks/useInfinteScrolling";
import { getCrushesWithPagination } from "../../data/queryCrushes";
import InfiniteScroll from "react-infinite-scroller";
import Spinner from "../../components/common/Spinner";
import CrushHeader from "../../components/CrushHeader";

const CrushPage = () => {
  const { items, isLoading, nextPage, count, startFrom } = useInfiniteScrolling(
    {
      query: getCrushesWithPagination,
      perPage: 10,
    }
  );
  return (
    <FlexColumn>
      <FlexRow alignItems="center">
        <GoBackButton />
        <Title text="UniCrush" />
      </FlexRow>

      <InfiniteScroll
        loadMore={nextPage}
        loader={<Spinner />}
        hasMore={startFrom < count}
      >
        {items.map((item) => (
          <CrushHeader crush={item} listItem={true} key={item.id} />
        ))}
      </InfiniteScroll>

      {!isLoading && count < 1 && <p>No hay trabajos disponibles</p>}
    </FlexColumn>
  );
};

export default CrushPage;
