import Parse from "parse";
import queryCountries from "./queryCountries";

const School = Parse.Object.extend("School");
const query = new Parse.Query(School);

export const saveSchool = async ({ name, country, isHighSchool, website }) => {
  try {
    const school = new School();
    const countryData = await queryCountries.get(country);

    school.set("name", name);
    school.set("country", countryData);
    school.set("isHighSchool", isHighSchool);
    school.set("website", website);

    school.save();

    return school;
  } catch (err) {
    throw err;
  }
};

export const getSchoolById = async (id) => {
  const query = new Parse.Query(School);
  query.include("country");
  return await query.get(id);
};

export const getSchoolMembersWithPagination = async ({
  startFrom,
  queryData,
  perPage,
}) => {
  const query = new Parse.Query(Parse.User);
  query.equalTo("school", queryData);
  query.skip(startFrom);
  query.include("createdBy");
  query.descending("createdAt");
  query.limit(perPage);
  query.withCount();
  const result = await query.find();

  return result;
};

export default query;
