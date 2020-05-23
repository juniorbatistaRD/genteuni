Parse.Cloud.define("readAllNotifications", async (req) => {
  const query = new Parse.Query("Notification");

  query.equalTo("forUser", req.user);
  query.equalTo("wasSeen", false);

  query.each(function (obj) {
    obj.set("wasSeen", true);
    obj.save();
  });
});
