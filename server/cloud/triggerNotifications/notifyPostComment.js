//get data with need for the notification
Parse.Cloud.beforeSave("PostComment", async (req, res) => {
  const comment = req.object;

  req.context = {
    triggeredBy: req.user,
    forUser: comment.get("createdBy"),
    text: comment.get("text"),
  };
});

Parse.Cloud.afterSave("PostComment", async (req, res) => {
  const context = req.context;

  if (context.forUser.id != context.triggeredBy.id) {
    const Notification = Parse.Object.extend("Notification");
    const notification = new Notification();

    notification.set("type", "POST_COMMENT");
    notification.set("forUser", context.forUser);
    notification.set("triggeredBy", context.triggeredBy);
    notification.set("text", context.text);

    await notification.save();
  }
});
