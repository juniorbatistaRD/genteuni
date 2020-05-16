//get data with need for the notification
Parse.Cloud.beforeSave("ProfileComment", async (req, res) => {
  const comment = req.object;

  //make fromUser forced to be currentUser
  comment.set("fromUser", req.user);

  req.context = {
    triggeredBy: req.user,
    forUser: comment.get("toUser"),
    text: comment.get("text"),
  };
});

Parse.Cloud.afterSave("ProfileComment", async (req, res) => {
  const context = req.context;

  if (req.context.forUser.id != context.triggeredBy.id) {
    const Notification = Parse.Object.extend("Notification");
    const notification = new Notification();

    notification.set("type", "PROFILE_COMMENT");
    notification.set("forUser", context.forUser);
    notification.set("triggeredBy", context.triggeredBy);
    notification.set("text", context.text);

    await notification.save();
  }
});
