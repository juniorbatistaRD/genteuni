import Parse from "parse";

const Post = Parse.Object.extend("Post");
const query = new Parse.Query(Post);

export const savePost = async ({ user, title, content, postOnSchool }) => {
  const post = new Post();
  post.set("byUser", user);
  post.set("title", title);
  post.set("content", content);
  post.set("postOnSchool", postOnSchool);
  const result = await post.save();

  return result;
};

export const getPostById = async (id) => {
  const query = new Parse.Query(Post);
  query.include("byUser");

  const result = await query.get(id);

  return result;
};

export const getPostsWithPagination = async ({ startFrom, user, perPage }) => {
  const query = new Parse.Query(Post);
  query.equalTo("byUser", user);
  query.skip(startFrom);
  query.include("fromUser");
  query.descending("createdAt");
  query.limit(perPage);
  query.withCount();
  const result = await query.find();

  return result;
};

export default query;
