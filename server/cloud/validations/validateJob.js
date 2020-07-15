Parse.Cloud.beforeSave("Job", async (req) => {
  const job = req.object;

  //make sure createdBy is current suer
  job.set("createdBy", req.user);

  if (job.get("title")) {
    if (job.get("title").length > 200 || job.get("title") < 10) {
      throw "Titulo debe de ser entre 10-200 caracteres";
    }
  }

  if (
    job.get("content").blocks.length > 200 ||
    job.get("content").blocks.length < 1
  ) {
    throw "Los articulos deben tener entre 1 a 150 bloques(texto, imagenes etc)";
  }

  //acl
  const acl = new Parse.ACL();
  acl.setPublicReadAccess(true);
  acl.setWriteAccess(req.user.id, true);

  job.setACL(acl);
});
