'use strict'

const DB = require('../db/runDB');
const DBinstance = DB.DBinstance;



class StudyPlanDAO {

    #db = null;

    constructor() {
        this.#db = DBinstance;
    }


    studyPlan_init_DB(userID, body) {

        return new Promise((resolve, reject) => {

            const sql = 'INSERT INTO OPTION(type, userID,  min, max) VALUES(?,?,?,?);'

            this.#db.run(sql, [body.type, userID, body.min, body.max], (err) => {
                if (err) {
                    reject(503);
                }
            })

            resolve(201);



        })

    }

    get_option_DB(userID) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM OPTION WHERE userID=?'
            this.#db.all(sql, [userID], (err, rows) => {
                if (err) {
                    reject(503);
                }
                const option = rows.map((opt) => (
                    {
                        type: opt.type,
                        min: opt.min,
                        max: opt.max
                    }
                ));

                resolve(option);
            })
        })

    }

    get_studyPlan_DB(userID) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM STUDY_PLAN INNER JOIN COURSES ON STUDY_PLAN.courseCode=COURSES.Code WHERE userID=?'
            this.#db.all(sql, [userID], (err, rows) => {
                if (err) {
                    reject(503);
                }
                const studyPlan = rows.map((sp) => (
                    {
                        Code: sp.Code,
                        Name: sp.Name,
                        Credits: sp.Credits,
                        Max_Students: sp.Max_Students
                    }
                ));
                resolve(studyPlan);
            })
        })

    }




    post_studyPlan_DB(userID, studyPlan) {

        return new Promise((resolve, reject) => {

            

            studyPlan.forEach((course) => {
                const sql = 'INSERT INTO STUDY_PLAN(userID, courseCode) VALUES(?,?);'
                this.#db.all(sql, [userID, course.Code], (err, rows) => {
                    if (err) {
                        reject(503);
                    }
                })


            })



            resolve(201);



        })

    }

    destroy_studyPlan_DB(userID, studyPlan) {

        return new Promise((resolve, reject) => {

            // Decrements enrollments
            studyPlan.forEach((c) => {
                let sql = 'UPDATE COURSES SET Enrolled_In=Enrolled_In-1 WHERE Code==?'
                this.#db.all(sql, [c.Code], (err, rows) => {
                    if (err) {
                        reject(503);
                    }
                    resolve(200);
                })
            })

            // const sql_delete = 'DELETE FROM OPTION WHERE userID==?';
            // this.#db.run(sql_delete, [userID], (err) => {
            //     if (err) {
            //         reject(503);
            //     }
            //     resolve(200);
            // })

            const sql = 'DELETE FROM STUDY_PLAN WHERE userID==?;'
            this.#db.run(sql, [userID], (err) => {
                if (err) {
                    reject(503);
                }
                resolve(200);
            })
        })

    }

}

module.exports = StudyPlanDAO;