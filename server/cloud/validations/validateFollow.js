Parse.Cloud.beforeSave("Follow", async (req, res) => {
  const query = new Parse.Query("Follow");
  const follow = req.object;

  //make fromUser forced to be currentUser
  req.object.set("fromUser", req.user);

  //make sure follow doesnt exist yet
  query.equalTo("fromUser", req.user);
  query.equalTo("toUser", follow.get("toUser"));
  const result = await query.count();

  if (result > 0) {
    throw "Ya sigues a este usuario";
  }
});
