"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
const Env = use("Env");

class File extends Model {
  //Dando acesso ao arquivo sem precisar ficar repassando a URL do arquivo.
  static get computed() {
    return ["url"];
  }

  // Gerando URL do arquivo.
  getUrl({ id }) {
    return `${Env.get("APP_URL")}/files/${id}`;
  }
}

module.exports = File;
