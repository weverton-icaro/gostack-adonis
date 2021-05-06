"use strict";

const moment = require("moment");
const crypto = require("crypto");

const User = use("App/Models/User");
const Mail = use("Mail");

class ForgotPasswordController {
  async store({ request, response }) {
    try {
      const email = request.input("email");
      const user = await User.findByOrFail("email", email);

      user.token = crypto.randomBytes(10).toString("hex");

      user.token_created_at = new Date();

      await user.save();

      //Enviando email de recuperação de senha
      await Mail.send(
        ["emails.forgot_password"],
        {
          email,
          token: user.token,
          link: `${request.input("redirect_url")}?token=${user.token}`,
        },
        (message) => {
          message
            .to(user.email)
            .from("weverton.dev@gmail.com", "Weverton | Onsurance")
            .subject("Recuperação de senha");
        }
      );
    } catch (error) {
      return response.status(error.status).send({
        error: { message: "Algo não deu certo, esse email existe?" },
      });
    }
  }

  async update({ request, response }) {
    try {
      const { token, password } = request.all();

      const user = await User.findByOrFail("token", token);

      //verificando a data de criação do token
      const tokenExpired = moment()
        .subtract("2", "days") //verificando se foi feito a mais de 2 dias
        .isAfter(user.token_created_at);

      if (tokenExpired) {
        return response.status(401).send({
          error: { message: "O token de recuperação está expirado." },
        });
      }

      user.token = null;
      user.token_created_at = null;
      user.password = password;

      await user.save();
    } catch (error) {
      return response.status(error.status).send({
        error: {
          message:
            "Algo não saiu como o esperado, sua senha não pode ser alterada!",
        },
      });
    }
  }
}

module.exports = ForgotPasswordController;
