Parse.Cloud.afterSave("ProfileComment", async (req, res) => {
  const context = req.context;

  if (context.forUser.id != context.triggeredBy.id) {
    const Notification = Parse.Object.extend("Notification");
    const notification = new Notification();

    notification.set("type", "PROFILE_COMMENT");
    notification.set("forUser", context.forUser);
    notification.set("triggeredBy", context.triggeredBy);
    notification.set("text", context.text);

    await notification.save();
  }
});
