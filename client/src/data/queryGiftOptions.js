import Parse from "parse";

const Gift = Parse.Object.extend("GiftOption");
const query = new Parse.Query(Gift);

export const getGiftsWithPagination = async ({ startFrom, perPage }) => {
  const query = new Parse.Query(Gift);
  query.skip(startFrom);
  query.include("fromUser");
  query.descending("createdAt");
  query.limit(perPage);
  query.withCount();
  const result = await query.find();

  return result;
};

export default query;
