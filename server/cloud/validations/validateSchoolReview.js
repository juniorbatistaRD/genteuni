Parse.Cloud.beforeSave("SchoolReview", async (req, res) => {
  const query = new Parse.Query("SchoolReview");
  const review = req.object;

  //make fromUser forced to be currentUser
  req.object.set("createdBy", req.user);

  //make sure review doesnt exist yet
  query.equalTo("createdBy", req.user);
  query.equalTo("school", review.get("school"));
  const result = await query.count();

  if (result > 0) {
    throw "Ya sigues haz publicado un review para esta escuela";
  }

  if (
    review.get("rating") > 5 ||
    review.get("rating") < 1 ||
    !Number.isInteger(review.get("rating"))
  ) {
    throw "Rating Invalido";
  }

  if (
    review.get("description").length > 200 ||
    review.get("description").length < 1
  ) {
    throw "Descripcion Invalido";
  }
});
