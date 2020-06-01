Parse.Cloud.beforeSave("Message", async (req, res) => {
  //make fromUser forced to be currentUser
  req.object.set("createdBy", req.user);

  if (req.object.get("message").length > 1000) {
    throw "Demasiado Largo";
  }
});
