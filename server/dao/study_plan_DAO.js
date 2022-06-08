'use strict'

const DB = require('../db/runDB');
const DBinstance = DB.DBinstance;

class StudyPlanDAO {

    #db = null;

    constructor() {
        this.#db = DBinstance;
    }

}

module.exports = StudyPlanDAO;