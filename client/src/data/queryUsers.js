import Parse from "parse";

const query = new Parse.Query(Parse.User);

export const getUserById = async userId => {
  query.include("country");
  query.include("school");

  const user = query.get(userId);
  return user;
};

export default query;
