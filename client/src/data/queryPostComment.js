import Parse from "parse";

const Comment = Parse.Object.extend("PostComment");
export const query = new Parse.Query(Comment);

export const saveComment = ({ text, createdBy, post }) => {
  const comment = new Comment();
  comment.set("text", text);
  comment.set("createdBy", createdBy);
  comment.set("post", post);
  return comment.save();
};

export const getCommentsWithPagination = async ({
  startFrom,
  queryData,
  perPage,
}) => {
  const query = new Parse.Query(Comment);
  query.equalTo("post", queryData);
  query.skip(startFrom);
  query.include("createdBy");
  query.descending("createdAt");
  query.limit(perPage);
  query.withCount();
  const result = await query.find();

  return result;
};

export const getCommentsNumberByPostId = async (post) => {
  const query = new Parse.Query(Comment);
  query.equalTo("post", post);
  const comments = await query.count();

  return comments;
};

export default query;
