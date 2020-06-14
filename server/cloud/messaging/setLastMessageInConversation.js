Parse.Cloud.afterSave("Message", async (req, res) => {
  const conversation = req.context.conversation;
  const message = req.context.message;

  conversation.set("lastMessage", message);
  await conversation.save();
});
