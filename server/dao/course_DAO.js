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
                const courses = rows.map(row => new Course(row.Code, row.Name, row.Credits, row.Max_Students, row.Enrolled_In, row.Incompatible_Courses, row.Preparatory_Course));
                resolve(courses);
            })
        })
    
    }

    get_course_by_Code_DB(code) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM COURSES WHERE Code=?;'
            this.#db.all(sql, [code], (err, rows) => {
                if (err) {
                    reject(503);
                }
                const course = rows.map(row => new Course(row.Code, row.Name, row.Credits, row.Max_Students, row.Enrolled_In, row.Incompatible_Courses, row.Preparatory_Course));
                resolve(course);
            })
        })
    }

    update_enrollments_DB(code) {
        return new Promise((resolve, reject) => {
            console.log("CODE N = ", code);
            const sql = 'UPDATE COURSES SET Enrolled_In=Enrolled_In+1 WHERE Code=?'
            this.#db.all(sql, [code], (err, rows) => {
                if (err) {
                    reject(503);
                }
                resolve(200);
            })
        })

    }

}

module.exports = CourseDAO;