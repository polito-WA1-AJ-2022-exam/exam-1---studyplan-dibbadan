'use strict'
class Server_DB {
    #sqlite3 = require('sqlite3');
    #db = undefined

    constructor(dbname) {

        let dbFile = './db/' + dbname + '.db';
        this.#db = new this.#sqlite3.Database(dbFile);
    }

    getDB() {
        return this.#db;
    }
}

module.exports = Server_DB;