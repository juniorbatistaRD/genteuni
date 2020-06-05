Parse.Cloud.afterSave("PostLike", async (req, res) => {
  const context = req.context;

  if (context.forUser.id != context.triggeredBy.id) {
    const Notification = Parse.Object.extend("Notification");
    const notification = new Notification();

    notification.set("type", "POST_LIKE");
    notification.set("forUser", context.forUser);
    notification.set("triggeredBy", context.triggeredBy);
    notification.set("text", context.post.attributes.title);

    await notification.save();
  }
});
