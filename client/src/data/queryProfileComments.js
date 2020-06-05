import Parse from "parse";

const Comment = Parse.Object.extend("ProfileComment");
const query = new Parse.Query(Comment);

export const saveComment = (text, toUser) => {
  const comment = new Comment();
  comment.set("text", text);
  comment.set("toUser", toUser);
  return comment.save();
};

export const getProfileCommentByUser = (toUser) => {
  const query = new Parse.Query(Comment);
  query.equalTo("toUser", toUser);
  return query.find();
};

export const getCommentsWithPagination = async ({
  startFrom,
  user,
  perPage,
}) => {
  const query = new Parse.Query(Comment);
  query.equalTo("toUser", user);
  query.skip(startFrom);
  query.include("fromUser");
  query.descending("createdAt");
  query.limit(perPage);
  query.withCount();
  const result = await query.find();

  return result;
};

export default query;
