Parse.Cloud.beforeSave("ProfileComment", async (req, res) => {
  const comment = req.object;

  //make fromUser forced to be currentUser
  comment.set("fromUser", req.user);

  //for notification
  req.context = {
    triggeredBy: req.user,
    forUser: comment.get("toUser"),
    text: comment.get("text"),
  };
});
