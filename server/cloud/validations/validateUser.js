Parse.Cloud.beforeSave(Parse.User, (req, res) => {
  var user = req.object;

  var pattern = /^([A-Za-z0-9_]){4,30}$/;

  if (!pattern.test(user.get("username"))) {
    throw "Nombre de usuario debe de ser entre 4-30 caracteres, solo letras numeros o dash(_)";
  }

  if (user.get("gender")) {
    if (["male", "female"].indexOf(user.get("gender")) == -1) {
      throw "Genero Invalido " + user.get("gender");
    }
  }

  if (user.get("bio")) {
    if (user.get("bio").length > 160 || user.get("bio") < 4) {
      throw "Tu bio debe de ser entre 4-30 caracteres";
    }
  }

  if (user.get("coverImage")) {
    if (user.get("coverImage") > 6 || user.get("coverImage") < 1) {
      throw "Imagen Invalida";
    }
  }
});
