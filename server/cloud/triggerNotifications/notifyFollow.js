//get data with need for the notification
Parse.Cloud.beforeSave("Follow", async (req, res) => {
  const follow = req.object;

  req.context = {
    triggeredBy: req.user,
    forUser: follow.get("toUser"),
  };
});

Parse.Cloud.afterSave("Follow", async (req, res) => {
  const context = req.context;

  if (context.forUser.id != context.triggeredBy.id) {
    const Notification = Parse.Object.extend("Notification");
    const notification = new Notification();

    notification.set("type", "FOLLOW");
    notification.set("forUser", context.forUser);
    notification.set("triggeredBy", context.triggeredBy);
    notification.set("text", "");

    await notification.save();
  }
});
