Parse.Cloud.beforeSave("View", async (req, res) => {
  const query = new Parse.Query("View");
  var view = req.object;

  //make fromUser forced to be currentUser
  req.object.set("fromUser", req.user);

  //avoid adding view to current user
  if (req.user.id === view.get("toUser").id) {
    throw "Trampos@";
  }

  //not add new view if user saw this profile in the last 24 hours
  async function validateViewTime() {
    query.equalTo("fromUser", view.get("fromUser"));
    query.equalTo("toUser", view.get("toUser"));
    query.descending("createdAt");
    const viewData = await query.first();

    if (viewData) {
      const now = new Date();
      const createdAt = new Date(viewData.attributes.createdAt);

      if ((now - createdAt) / 1000 / 60 / 60 < 24) {
        throw "Already seen this profile today";
      }
    }
  }

  await validateViewTime();
});
