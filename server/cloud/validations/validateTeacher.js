Parse.Cloud.beforeSave("Teacher", (req, res) => {
  var teacher = req.object;

  //make sure is createdBy is current user
  teacher.set("createdBy", req.user);

  if (teacher.get("name")) {
    if (teacher.get("name").length > 32 || teacher.get("name") < 3) {
      throw "Nombre debe de ser entre 3-32 caracteres";
    }
  }
});
