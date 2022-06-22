'use strict'

const DB = require('./db');
const DBinstance = (new DB('server_db')).getDB();

exports.DBinstance = DBinstance;