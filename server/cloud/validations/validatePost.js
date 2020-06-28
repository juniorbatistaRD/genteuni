Parse.Cloud.beforeSave("Post", async (req, res) => {
  const post = req.object;

  //make sure byuser is current suer
  post.set("byUser", req.user);

  if (post.get("title")) {
    if (post.get("title").length > 100 || post.get("title") < 10) {
      throw "Titulo debe de ser entre 3-100 caracteres";
    }
  }

  if (
    post.get("content").blocks.length > 200 ||
    post.get("content").blocks.length < 1
  ) {
    throw "Los articulos deben tener entre 1 a 150 bloques(texto, imagenes etc)";
  }

  //acl
  const acl = new Parse.ACL();
  acl.setPublicReadAccess(true);
  acl.setWriteAccess(req.user.id, true);

  post.setACL(acl);

  //add school
  if (post.get("postOnSchool")) {
    post.set("relatedToSchool", req.user.attributes.school);
  }

  //add country
  post.set("relatedToCountry", req.user.attributes.country);
});
