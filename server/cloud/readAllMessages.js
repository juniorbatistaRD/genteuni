Parse.Cloud.define("readAllMessages", async (req) => {
  const query = new Parse.Query("Message");
  const queryConversation = new Parse.Query("Conversation");

  const conversation = await queryConversation.get(req.params.conversation);

  //validate currentUser is part of the conversation
  const currentUser = conversation.attributes.members.filter(
    (user) => user.id === req.user.id
  );
  if (currentUser.length < 1) {
    throw "Error";
  }

  query.equalTo("conversation", conversation);
  query.doesNotExist("wasSeen");
  // query.notContainedIn("createdBy", [req.user]);

  query.each(function (obj) {
    obj.set("wasSeen", true);
    obj.save(null, { useMasterKey: true });
  });
});
