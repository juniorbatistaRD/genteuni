const { async } = require("validate.js");

Parse.Cloud.define("getSchoolRankingList", async (req) => {
  const SchoolReview = Parse.Object.extend("SchoolReview");
  const School = Parse.Object.extend("School");

  const pipeline = {
    group: {
      objectId: "$school",
      total: { $sum: 1 },
      avg: { $avg: "$rating" },
    },
    sort: { total: -1, avg: -1 },
    limit: 10,
  };

  //get top 10 schools with more ratings
  const queryTotalReviews = new Parse.Query(SchoolReview);
  const totalReviewsResult = await queryTotalReviews.aggregate(pipeline);

  console.log(totalReviewsResult, "yay");
  //sort by avergare ratings
  const sortByRatings = (a, b) => b.avg - a.avg;
  totalReviewsResult.sort(sortByRatings);

  //fetch school info
  const schoolsWithInfo = await Promise.all(
    totalReviewsResult.map(async (school) => {
      const querySchool = new Parse.Query(School);
      const schoolInfo = await querySchool.get(school.objectId);
      return { schoolInfo, ...school };
    })
  );

  return schoolsWithInfo;
});
