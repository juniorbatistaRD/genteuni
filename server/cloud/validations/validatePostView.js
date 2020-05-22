var validate = require("validate.js");

Parse.Cloud.beforeSave("PostView", async (req, res) => {
  const query = new Parse.Query("PostView");
  var view = req.object;

  //validate fields
  var constraints = {
    fromUser: {
      presence: true,
    },
    post: {
      presence: true,
    },
  };

  const errors = validate(
    { fromUser: view.get("fromUser"), post: view.get("post") },
    constraints
  );

  if (errors) {
    throw "Datos Invalidos";
  }

  //make fromUser forced to be currentUser
  req.object.set("fromUser", req.user);

  //   avoid adding view to current user
  const post = await view.get("post").fetch();

  if (req.user.id === post.attributes.byUser.id) {
    throw "Trampos@";
  }

  //not add new view if user saw this profile in the last 24 hours
  async function validateViewTime() {
    query.equalTo("fromUser", view.get("fromUser"));
    query.equalTo("post", view.get("post"));
    query.descending("createdAt");
    const viewData = await query.first();

    if (viewData) {
      const now = new Date();
      const createdAt = new Date(viewData.attributes.createdAt);

      if ((now - createdAt) / 1000 / 60 / 60 < 24) {
        throw "Already seen this post today";
      }
    }
  }

  await validateViewTime();
});
