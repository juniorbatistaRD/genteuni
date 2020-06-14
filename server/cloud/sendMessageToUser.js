Parse.Cloud.define("sendMessageToUser", async (req, res) => {
  const queryUser = new Parse.Query(Parse.User);
  const queryConversation = new Parse.Query("Conversation");
  const Conversation = Parse.Object.extend("Conversation");
  const Message = Parse.Object.extend("Message");

  let conversation;

  const toUser = await queryUser.get(req.params.toUser);

  //check if there's already a conversation
  queryConversation.containsAll("members", [req.user, toUser]);
  const result = await queryConversation.first();

  //if not, create one
  if (!result) {
    const newConversation = new Conversation();
    newConversation.set("members", [req.user, toUser]);
    conversation = await newConversation.save();
  } else {
    conversation = result;
  }
  console.log(req.user);
  const message = new Message();
  message.set("message", req.params.message);
  message.set("createdBy", req.user);
  message.set("conversation", conversation);
  message.save(null, { useMasterKey: true });
});
