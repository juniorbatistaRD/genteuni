Parse.Cloud.afterLogout(async (req) => {
  const { object: session } = req;

  const user = session.get("user");
  user.set("notificationsToken", null);
  user.save(null, { useMasterKey: true });
});
