"use strict";
const Antl = use("Antl");

class Project {
  get validateAll() {
    //validar todos os campos da rules de uma vez
    return true;
  }

  get rules() {
    return {
      title: "required",
      description: "required",
    };
  }

  get messages() {
    return Antl.list("validation");
  }
}

module.exports = Project;
