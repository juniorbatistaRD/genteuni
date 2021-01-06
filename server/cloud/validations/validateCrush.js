Parse.Cloud.beforeSave("Crush", async (req, res) => {
  const crush = req.object;
  const query = new Parse.Query("Crush");

  //make createdBy forced to be currentUser
  crush.set("createdBy", req.user);

  //set crush country and school to current toUser's
  const toUser = await crush.get("toUser").fetch();
  if (toUser.attributes.country)
    crush.set("country", toUser.attributes.country);
  if (toUser.attributes.school) crush.set("school", toUser.attributes.school);

  //acl
  const acl = new Parse.ACL();
  acl.setPublicReadAccess(true);
  acl.setWriteAccess(req.user.id, true);

  crush.setACL(acl);

  //make sure crush doesnt exist yet
  query.equalTo("createdBy", req.user);
  query.equalTo("toUser", crush.get("toUser"));
  const result = await query.count();

  if (result > 0) {
    throw "Ya tienes un crush con este usuario";
  }

  //for notification
  req.context = {
    triggeredBy: req.user,
    forUser: crush.get("toUser"),
    text: crush.get("text"),
  };
});
