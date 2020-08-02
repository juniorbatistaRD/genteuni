Parse.Cloud.afterSave("JobApplication", async (req, res) => {
  const context = req.context;
  const job = await context.job.fetch();

  if (job.attributes.createdBy.id != context.triggeredBy.id) {
    const Notification = Parse.Object.extend("Notification");
    const notification = new Notification();

    notification.set("type", "JOB_APPLICATION_RECEIVED");
    notification.set("forUser", job.attributes.createdBy);
    notification.set("triggeredBy", context.triggeredBy);
    notification.set("text", context.text);

    await notification.save();
  }
});
