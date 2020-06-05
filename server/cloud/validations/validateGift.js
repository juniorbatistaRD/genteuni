Parse.Cloud.beforeSave("Gift", async (req, res) => {
  const query = new Parse.Query("Gift");
  const gift = req.object;

  gift.set("fromUser", req.user);

  var yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  //make sure follow doesnt exist yet
  query.equalTo("fromUser", req.user);
  query.greaterThan("createdAt", yesterday);
  const result = await query.count();

  if (result > 9) {
    throw "Solo puedes enviar 10 regalos en las ultimas 24 horas";
  }

  //make fromUser forced to be currentUser
  gift.set("fromUser", req.user);

  //for notifications
  req.context = {
    triggeredBy: req.user,
    forUser: gift.get("toUser"),
  };
});
