"use strict";

const BaseExceptionHandler = use("BaseExceptionHandler");
const Env = use("Env"); // Desenvolvimento ou Produção
const Youch = use("Youch"); //Formatador de erros
const Config = use("Config");

const Raven = require("raven");

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle(error, { request, response }) {
    //Se for um error de validação retorna apenas as mensagem em formato JSON para o front
    if (error.name === "ValidationException") {
      return response.status(error.status).send(error.messages);
    }

    //Se for um error em desenvolvimento, informa os locais detalhados do error
    if (Env.get("NODE_ENV") === "development") {
      const youch = new Youch(error, request.request);
      const errorJSON = await youch.toJSON();

      return response.status(error.status).send(errorJSON);
    }

    return response.status(error.status);
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report(error, { request }) {
    Raven.config(Config.get("services.sentry.dsn"));
    Raven.captureException(error);
  }
}

module.exports = ExceptionHandler;
