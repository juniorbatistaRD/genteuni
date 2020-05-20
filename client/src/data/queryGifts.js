import Parse from "parse";

const Gift = Parse.Object.extend("Gift");
const query = new Parse.Query(Gift);

export const saveGift = (toUser, giftOption) => {
  const gift = new Gift();
  gift.set("toUser", toUser);
  gift.set("gift", giftOption);
  return gift.save();
};

export const getUserGiftsWithPagination = async ({
  startFrom,
  perPage,
  user
}) => {
  const query = new Parse.Query(Gift);

  query.equalTo("toUser", user);
  query.skip(startFrom);
  query.include("fromUser");
  query.include("gift");
  query.descending("createdAt");
  query.limit(perPage);
  query.withCount();

  const result = await query.find();

  return result;
};

export default query;
