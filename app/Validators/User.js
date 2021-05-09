"use strict";
const Antl = use("Antl");

class User {
  get validateAll() {
    //validar todos os campos da rules de uma vez
    return true;
  }

  get rules() {
    return {
      username: "required|unique:users",
      email: "required|email|unique:users",
      password: "required|confirmed",
    };
  }

  get messages() {
    return Antl.list("validation");
  }
}

module.exports = User;
