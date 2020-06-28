Parse.Cloud.beforeSave("ProfileComment", async (req, res) => {
  const comment = req.object;

  //make fromUser forced to be currentUser
  comment.set("fromUser", req.user);

  //acl
  const acl = new Parse.ACL();
  acl.setPublicReadAccess(true);
  acl.setWriteAccess(req.user.id, true);

  comment.setACL(acl);

  //for notification
  req.context = {
    triggeredBy: req.user,
    forUser: comment.get("toUser"),
    text: comment.get("text"),
  };
});
