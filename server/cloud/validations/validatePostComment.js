Parse.Cloud.beforeSave("PostComment", async (req, res) => {
  const comment = req.object;

  if (comment.get("text").length > 270) {
    throw "Demasiado Largo";
  }
  //make fromUser forced to be currentUser
  comment.set("createdBy", req.user);

  //for notification
  req.context = {
    triggeredBy: req.user,
    post: comment.get("post"),
    text: comment.get("text"),
  };
});
