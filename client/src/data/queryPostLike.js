import Parse from "parse";

const PostLike = Parse.Object.extend("PostLike");
const query = new Parse.Query(PostLike);

export const saveLike = async (fromUser, post) => {
  const postLike = new PostLike();
  // postLike.set("fromUser", fromUser);
  postLike.set("post", post);
  return await postLike.save();
};

export const isPostLiked = async (fromUser, post) => {
  const query = new Parse.Query(PostLike);
  query.equalTo("fromUser", fromUser);
  query.equalTo("post", post);
  const result = await query.count();

  return result > 0 ? true : false;
};

export const deleteLike = async (fromUser, post) => {
  const query = new Parse.Query(PostLike);
  query.equalTo("fromUser", fromUser);
  query.equalTo("post", post);
  const result = await query.first();

  return result.destroy();
};
export default query;

export const getLikesNumberByPostId = async (post) => {
  const query = new Parse.Query(PostLike);
  query.equalTo("post", post);
  const likes = await query.count();

  return likes;
};
