Parse.Cloud.define("getSchoolAverageRating", async (req) => {
  const SchoolReview = Parse.Object.extend("SchoolReview");

  //get total average for school
  const pipeline = {
    match: { school: req.params.schoolId },
    group: { objectId: "null", avg: { $avg: "$rating" }, total: { $sum: 1 } },
  };

  const query = new Parse.Query(SchoolReview);
  const totalResult = await query.aggregate(pipeline);

  return totalResult;
});
