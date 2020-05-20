import Parse from "parse";

const Country = Parse.Object.extend("Country");
const query = new Parse.Query(Country);

export default query;
