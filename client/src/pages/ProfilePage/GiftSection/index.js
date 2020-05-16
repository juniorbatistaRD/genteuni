import React from "react";
import Title from "../../../components/common/Title";
import useGifts from "./useGifts";
import InfiniteScroll from "react-infinite-scroller";
import Gift from "./Gift";
import Text from "../../../components/common/Text";
import styles from "./index.module.css";
import { ReactComponent as EmptyIlustration } from "../../../assets/images/empty.svg";

function GiftSection({ user }) {
  const { startFrom, count, nextPage, gifts, isLoading } = useGifts(user);

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
            {gifts.map(gift => (
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
        <div className={styles.nothingFound}>
          <Title text="Nadie ha dejado un regalo aun! 😥" fontSize="16px" />
          <Title text="Se el primero!😎 " fontSize="16px" />
          <EmptyIlustration width="200px" height="200px" />
        </div>
      )}
    </>
  );
}

export default GiftSection;
