var validate = require("validate.js");

Parse.Cloud.beforeSave("PostLike", async (req, res) => {
  const query = new Parse.Query("PostLike");
  const postLike = req.object;
  const post = await postLike.get("post").fetch();

  //make fromUser forced to be currentUser
  postLike.set("fromUser", req.user);

  //validate fields
  var constraints = {
    post: {
      presence: true,
    },
    fromUser: {
      presence: true,
    },
  };

  const errors = validate(
    { post: postLike.get("post"), fromUser: postLike.get("fromUser") },
    constraints
  );

  if (errors) {
    throw "Datos Invalidos";
  }

  //make sure postLike doesnt exist yet
  query.equalTo("fromUser", req.user);
  query.equalTo("post", postLike.get("post"));
  const result = await query.count();

  if (result > 0) {
    throw "Ya sigues a este usuario";
  }

  //acl
  const acl = new Parse.ACL();
  acl.setPublicReadAccess(true);
  acl.setWriteAccess(req.user.id, true);

  postLike.setACL(acl);

  //for notification
  req.context = {
    triggeredBy: req.user,
    forUser: post.attributes.byUser,
    post: post,
  };
});
