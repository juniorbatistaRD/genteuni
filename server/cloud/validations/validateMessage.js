Parse.Cloud.beforeSave("Message", async (req, res) => {
  //make fromUser forced to be currentUser
  if (!req.original) {
    req.object.set("createdBy", req.user);
  }

  if (
    req.object.get("message").length > 1000 ||
    req.object.get("message").length < 1
  ) {
    throw "Demasiado Largo o esta vacio";
  }
});
