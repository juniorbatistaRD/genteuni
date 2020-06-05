import React from "react";
import Title from "../../../components/common/Title";
import InfiniteScroll from "react-infinite-scroller";
import Gift from "./Gift";
import Text from "../../../components/common/Text";
import styles from "./index.module.css";
import { ReactComponent as EmptyIlustration } from "../../../assets/images/empty.svg";
import FlexColumn from "../../../components/common/FlexColumn";
import useInfiniteScrolling from "../../../hooks/useInfinteScrolling";
import { getUserGiftsWithPagination } from "../../../data/queryGifts";

function GiftSection({ user }) {
  const { startFrom, count, nextPage, items, isLoading } = useInfiniteScrolling(
    {
      query: getUserGiftsWithPagination,
      user,
      perPage: 10,
    }
  );

  return (
    <>
      <Title text={`Regalos (${count})`} margin="10px"></Title>
      {isLoading ? (
        <Text text="Cargando..." />
      ) : (
        <InfiniteScroll
          hasMore={startFrom < count}
          loadMore={nextPage}
          loader={"Cargando..."}
        >
          <div className={styles.giftsContainer}>
            {items.map((gift) => (
              <Gift
                key={gift.id}
                image={gift.attributes.gift.attributes.image?.url()}
                fromUser={gift.attributes.fromUser}
                text={gift.attributes.gift.attributes.name}
              />
            ))}
          </div>
        </InfiniteScroll>
      )}

      {count < 1 && !isLoading && (
        <FlexColumn alignItems="center" margin="auto">
          <Title text="Nadie ha dejado un regalo aun! 😥" fontSize="16px" />
          <Title text="Se el primero!😎 " fontSize="16px" />
          <EmptyIlustration width="200px" height="200px" />
        </FlexColumn>
      )}
    </>
  );
}

export default GiftSection;
