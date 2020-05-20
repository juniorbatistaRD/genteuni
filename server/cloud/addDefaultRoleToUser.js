Parse.Cloud.afterSave(Parse.User, async (req, res) => {
  const user = req.object;

  //add default role to user
  const query = new Parse.Query(Parse.Role);
  query.equalTo("name", "user");
  const role = await query.first();
  role.getUsers().add(user);
  role.save();
});
