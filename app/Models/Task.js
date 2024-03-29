"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Task extends Model {
  static boot() {
    super.boot();

    this.addHook("afterCreate", "TaskHook.sendNewTaskMail"); //será disparado depois da Task ser criada
    this.addHook("beforeUpdate", "TaskHook.sendNewTaskMail"); //será disparado antes da Task ser alterada
  }

  project() {
    return this.belongsTo("App/Models/Project");
  }

  user() {
    return this.belongsTo("App/Models/User");
  }

  file() {
    return this.belongsTo("App/Models/File");
  }
}

module.exports = Task;
