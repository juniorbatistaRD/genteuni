const { User } = require("parse");

Parse.Cloud.beforeSave("TeacherReview", async (req, res) => {
  const query = new Parse.Query("TeacherReview");
  const review = req.object;

  console.log(Parse.User.current());

  //make sure review doesnt exist yet
  query.equalTo("createdBy", req.user);
  query.equalTo("teacher", review.get("teacher"));
  const result = await query.count();

  if (result > 0) {
    throw "Ya sigues haz publicado un review para esta escuela";
  }

  //make fromUser forced to be currentUser
  review.set("createdBy", req.user);

  //acl
  const acl = new Parse.ACL();
  acl.setPublicReadAccess(true);
  acl.setWriteAccess(req.user.id, true);

  review.setACL(acl);

  //data validations
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
