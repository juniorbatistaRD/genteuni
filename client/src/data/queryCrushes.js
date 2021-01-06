import Parse from "parse";

const Crush = Parse.Object.extend("Crush");
const query = new Parse.Query(Crush);

export const saveCrush = ({ text, toUser, isSecret }) => {
  const crush = new Crush();
  crush.set("text", text);
  crush.set("toUser", toUser);
  crush.set("isSecret", isSecret);
  return crush.save();
};

export const getCrushesWithPagination = async ({
  startFrom,
  queryData,
  perPage,
  user,
}) => {
  const query = new Parse.Query(Crush);
  const queryCountry = new Parse.Query("Country");
  const querySchool = new Parse.Query("School");

  //if with country
  if (queryData) {
    const countryResult = await queryCountry.get(queryData);
    query.equalTo("country", countryResult);
  }
  //if with school
  if (user) {
    query.equalTo("school", user);
  }

  query.skip(startFrom);
  query.includeAll();
  query.descending("createdAt");
  query.limit(perPage);
  query.withCount();
  const result = await query.find();

  return result;
};

export default query;
