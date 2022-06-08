'use strict';
const DB = require('../db/runDB');
const DBinstance = DB.DBinstance;
const crypto = require('crypto');

class UserDAO {

    #db = null;

    constructor() {
        this.#db = DBinstance;
    }

    getUser = (email, password) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM USERS WHERE email = ?';
            this.#db.get(sql, [email], (err, row) => {
                if (err) {
                    reject(err);
                }
                else if (row === undefined) {
                    resolve(false);
                }
                else {
                    const user = { id: row.id, username: row.email, name: row.name };

                    
                    crypto.scrypt(password, row.salt, 32, function (err, hashedPassword) {
                        if (err) {
                            reject(err)
                        }
                        if(!crypto.timingSafeEqual(Buffer.from(row.hash, 'hex'), hashedPassword)){
                            resolve(false);
                        }   
                        else
                            resolve(user);
                    });
                }
            });
        });
    };

    getUserById = (id) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM USERS WHERE id = ?';
            this.#db.get(sql, [id], (err, row) => {
                if (err) {
                    reject(err);
                }
                else if (row === undefined) {
                    resolve({ error: 'User not found!' });
                }
                else {
                    const user = { id: row.id, username: row.email, name: row.name };
                    resolve(user);
                }
            });
        });
    };

}

module.exports = UserDAO;





