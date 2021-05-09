"use strict";
const Antl = use("Antl");

class ForgotPassword {
  get validateAll() {
    //validar todos os campos da rules de uma vez
    return true;
  }

  get rules() {
    return {
      email: "required|email",
      redirect_url: "required|url",
    };
  }

  get messages() {
    return Antl.list("validation");
  }
}

module.exports = ForgotPassword;
