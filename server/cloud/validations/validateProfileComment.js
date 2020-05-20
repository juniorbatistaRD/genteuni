Parse.Cloud.beforeSave("ProfileComment", async (req, res) => {
  const comment = req.object;

  //make fromUser forced to be currentUser
  comment.set("fromUser", req.user);
});
