Parse.Cloud.beforeSave("Answer", async (req) => {
  const answer = req.object;

  if (answer.get("text").length > 360) {
    throw "Demasiado Largo";
  }
  //make createdBy forced to be currentUser
  answer.set("createdBy", req.user);

  //acl
  const acl = new Parse.ACL();
  acl.setPublicReadAccess(true);
  acl.setWriteAccess(req.user.id, true);

  answer.setACL(acl);

  //for notification
  // req.context = {
  //   triggeredBy: req.user,
  //   post: answer.get("post"),
  //   text: answer.get("text"),
  // };
});
