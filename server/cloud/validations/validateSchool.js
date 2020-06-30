Parse.Cloud.beforeSave("School", (req, res) => {
  var school = req.object;

  //make sure is createdBy is current user
  school.set("createdBy", req.user);

  if (school.get("name")) {
    if (school.get("name").length > 100 || school.get("name") < 3) {
      throw "Nombre debe de ser entre 3-100 caracteres";
    }
  }

  if (school.get("website")) {
    if (school.get("website").length > 100 || school.get("website") < 4) {
      throw "Website debe de ser entre 4-30 caracteres";
    }
  }
});
