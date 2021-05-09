"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

//Quando receber um post na rota user, será chamado o controller Users
Route.resource("users", "UserController").validator("User");

//geração de token de acesso
Route.post("sessions", "SessionController.store").validator("Session");

//Encriptação e recuperação da senha
Route.post("passwords", "ForgotPasswordController.store").validator(
  "ForgotPassword"
);

//Alteração de senha com token enviado por email
Route.put("passwords", "ForgotPasswordController.update").validator(
  "ResetPassword"
);

//Criação de arquivos
Route.get("/files/:id", "FileController.show");

//Rotas possiveis apenas quando o usuario está logado
// usuário só conseguirá chamar a rota se enviar um token de autenticação
Route.group(() => {
  Route.post("/files", "FileController.store");

  Route.resource("projects", "ProjectController")
    .apiOnly()
    .validator(new Map([[["projects.store"], ["Project"]]]));

  Route.resource("projects.tasks", "TaskController")
    .apiOnly()
    .validator(new Map([[["projects.tasks.store"], ["Task"]]]));
}).middleware(["auth"]);
