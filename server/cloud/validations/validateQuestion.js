Parse.Cloud.beforeSave("Question", async (req) => {
  const question = req.object;

  //make sure createdBy is current suer
  question.set("createdBy", req.user);

  if (question.get("title")) {
    if (question.get("title").length > 200 || question.get("title") < 10) {
      throw "Titulo debe de ser entre 10-200 caracteres";
    }
  }

  if (
    question.get("content").blocks.length > 200 ||
    question.get("content").blocks.length < 1
  ) {
    throw "Los articulos deben tener entre 1 a 150 bloques(texto, imagenes etc)";
  }

  //acl
  const acl = new Parse.ACL();
  acl.setPublicReadAccess(true);
  acl.setWriteAccess(req.user.id, true);

  question.setACL(acl);

  //add school
  if (question.get("postOnSchool")) {
    question.set("relatedToSchool", req.user.attributes.school);
  }

  //add country
  question.set("relatedToCountry", req.user.attributes.country);
});
