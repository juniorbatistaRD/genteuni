Parse.Cloud.define("getTeacherAverageRating", async (req) => {
  const TeacherReview = Parse.Object.extend("TeacherReview");

  //get total average for school
  const pipeline = {
    match: { teacher: req.params.teacherId },
    group: { objectId: "null", avg: { $avg: "$rating" }, total: { $sum: 1 } },
  };

  const query = new Parse.Query(TeacherReview);
  const totalResult = await query.aggregate(pipeline);

  return totalResult;
});
