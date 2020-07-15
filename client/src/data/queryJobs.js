import Parse from "parse";

const Job = Parse.Object.extend("Job");
const AreaObject = Parse.Object.extend("Area");
const CountryObject = Parse.Object.extend("Country");
const query = new Parse.Query(Job);

export const saveJob = async ({ title, content, area, country }) => {
  const job = new Job();
  const queryArea = new Parse.Query(AreaObject);
  const queryCountry = new Parse.Query(CountryObject);

  const fetchedArea = await queryArea.get(area);
  const fetchedCountry = await queryCountry.get(country);

  job.set("title", title);
  job.set("content", content);
  job.set("area", fetchedArea);
  job.set("country", fetchedCountry);
  const result = await job.save();

  return result;
};

export const getJobById = async (id) => {
  const query = new Parse.Query(Job);
  query.include("createdBy");

  const result = await query.get(id);

  return result;
};

export default query;
