Parse.Cloud.afterSave("Answer", async (req, res) => {
  const context = req.context;
  const question = await context.question.fetch();

  if (question.attributes.createdBy.id != context.triggeredBy.id) {
    const Notification = Parse.Object.extend("Notification");
    const notification = new Notification();

    notification.set("type", "QUESTION_ANSWER");
    notification.set("forUser", question.attributes.createdBy);
    notification.set("triggeredBy", context.triggeredBy);
    notification.set("text", context.text);

    await notification.save();
  }
});
