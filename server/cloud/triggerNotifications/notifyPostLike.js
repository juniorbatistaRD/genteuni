//get data with need for the notification
Parse.Cloud.beforeSave("PostLike", async (req, res) => {
  const like = req.object;
  const post = await like.get("post").fetch();
  console.log(post);
  req.context = {
    triggeredBy: req.user,
    forUser: post.attributes.byUser,
    post: post,
  };
});

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
