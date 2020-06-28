import Parse from "parse";

const SchoolReview = Parse.Object.extend("SchoolReview");
const query = new Parse.Query(SchoolReview);

export const saveSchoolRating = async ({ school, description, rating }) => {
  const schoolReview = new SchoolReview();
  schoolReview.set("school", school);
  schoolReview.set("description", description);
  schoolReview.set("rating", rating);
  return await schoolReview.save();
};

export const getReviewsWithPagination = async ({
  startFrom,
  perPage,
  queryData,
}) => {
  const query = new Parse.Query(SchoolReview);
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
