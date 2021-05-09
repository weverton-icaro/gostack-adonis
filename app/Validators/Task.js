"use strict";
const Antl = use("Antl");

class Task {
  get validateAll() {
    //validar todos os campos da rules de uma vez
    return true;
  }

  get rules() {
    return {
      title: "required",
      due_date: "date",
    };
  }

  get messages() {
    return Antl.list("validation");
  }
}

module.exports = Task;
