"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProjectSchema extends Schema {
  up() {
    this.create("projects", (table) => {
      table.increments();
      table
        .integer("user_id") //Efetua o relacionamento via chave estrangera com a tabela de usuario
        .unsigned() //Força que no banco seja somente valores positivos
        .references("id") //Nome do campo que queremos referenciar
        .inTable("users") //Tabela que queremos referenciar
        .onUpdate("CASCADE") //Faz com que as alterações da tabela sejam efetuadas ao projeto também
        .onDelete("SET NULL"); // A partir do momento que o usuario for deletado, ele passa a ser null
      table.string("title").notNullable(); //Titulo do projeto e não será nulo
      table.text("description").notNullable(); //Descrição do projeto, não pode ser nulo
      table.timestamps();
    });
  }

  down() {
    this.drop("projects");
  }
}

module.exports = ProjectSchema;
