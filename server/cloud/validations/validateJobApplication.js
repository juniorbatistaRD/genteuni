Parse.Cloud.beforeSave("JobApplication", async (req) => {
  const jobApplication = req.object;

  if (jobApplication.get("text").length > 500) {
    throw "Demasiado Largo";
  }
  //make createdBy forced to be currentUser
  jobApplication.set("createdBy", req.user);

  //acl
  const acl = new Parse.ACL();
  acl.setPublicReadAccess(true);
  acl.setWriteAccess(req.user.id, true);

  jobApplication.setACL(acl);

  // for notification
  req.context = {
    triggeredBy: req.user,
    job: jobApplication.get("job"),
    text: jobApplication.get("text"),
  };
});
