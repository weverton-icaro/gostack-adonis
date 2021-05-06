"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

//Quando receber um post na rota user, será chamado o controller Users
Route.post("users", "UserController.store");
//geração de token de acesso
Route.post("sessions", "SessionController.store");

//Encriptação e recuperação da senha
Route.post("passwords", "ForgotPasswordController.store");
//Alteração de senha com token enviado por email
Route.put("passwords", "ForgotPasswordController.update");

//Criação de arquivos
Route.post("/files", "FileController.store");
