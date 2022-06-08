'use strict'

const DB = require('../db/runDB');
const DBinstance = DB.DBinstance;
const { Course } = require('../models/Course');

class CourseDAO {

    #db = null;

    constructor() {
        this.#db = DBinstance;
    }

    get_all_courses_DB() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM COURSES;'
            this.#db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(503);
                }
                const courses = rows.map(row => new Course(row.Code, row.Name, row.Credits, row.Max_Students, row.Incompatible_Courses, row.Preparatory_Course));
                resolve(courses);
            })
        })
    
    }

}

module.exports = CourseDAO;