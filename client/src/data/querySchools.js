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
    console.log("hey");
    throw err;
  }
};

export default query;
