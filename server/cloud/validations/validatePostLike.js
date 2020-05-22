var validate = require("validate.js");

Parse.Cloud.beforeSave("PostLike", async (req, res) => {
  const query = new Parse.Query("PostLike");
  const postLike = req.object;

  //validate fields
  var constraints = {
    post: {
      presence: true,
    },
  };

  const errors = validate({ post: postLike.get("post") }, constraints);

  if (errors) {
    throw "Datos Invalidos";
  }

  //make fromUser forced to be currentUser
  postLike.set("fromUser", req.user);

  //make sure postLike doesnt exist yet
  query.equalTo("fromUser", req.user);
  query.equalTo("post", postLike.get("post"));
  const result = await query.count();

  if (result > 0) {
    throw "Ya sigues a este usuario";
  }
});
