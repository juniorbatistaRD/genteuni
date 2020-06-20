Parse.Cloud.define("getSchoolAverageRating", async (req) => {
  const SchoolReview = Parse.Object.extend("SchoolReview");

  const querySchool = new Parse.Query("School");
  const school = await querySchool.get(req.params.schoolId);

  //get total average for school
  const pipeline = {
    match: { school: school.id },
    group: { objectId: "null", avg: { $avg: "$rating" } },
  };

  const query = new Parse.Query(SchoolReview);
  const totalResult = await query.aggregate(pipeline);

  //get total amount of reviews
  const queryTotalReviews = new Parse.Query(SchoolReview);
  queryTotalReviews.equalTo("school", school);
  const totalReviewsResult = await queryTotalReviews.count();

  return { totalAverage: totalResult[0].avg, totalReviews: totalReviewsResult };
});
