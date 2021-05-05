"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

//Quando receber um post na rota user, será chamado o controller Users
Route.post("users", "UserController.store");

Route.post("sessions", "SessionController.store");

Route.post("passwords", "ForgotPasswordController.store");
