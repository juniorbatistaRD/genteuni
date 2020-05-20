import Parse from "parse";

const View = Parse.Object.extend("View");
const query = new Parse.Query(View);

export const saveView = (fromUser, toUser) => {
  const view = new View();
  view.set("fromUser", fromUser);
  view.set("toUser", toUser);
  view.save();
};

export const getViewsNumberByUserId = async userId => {
  const query = new Parse.Query(View);
  query.equalTo("toUser", userId);
  const views = await query.count();

  return views;
};

export default query;
