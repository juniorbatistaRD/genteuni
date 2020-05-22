import Parse from "parse";

const View = Parse.Object.extend("PostView");
const query = new Parse.Query(View);

export const saveView = (fromUser, post) => {
  const view = new View();
  view.set("fromUser", fromUser);
  view.set("post", post);
  view.save();
};

export const getViewsNumberByPostId = async (post) => {
  const query = new Parse.Query(View);
  query.equalTo("post", post);
  const views = await query.count();

  return views;
};

export default query;
