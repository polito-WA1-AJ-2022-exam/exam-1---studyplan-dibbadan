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
                        min:opt.min,
                        max:opt.max
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
                console.log("ROWS = ", rows);
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

            // this.get_studyPlan_DB(userID).then((sp) => {
            //     sp.forEach((c) => {
            //         const sql = 'UPDATE COURSES SET Enrolled_In=Enrolled_In-1 WHERE Code=?;';
            //         this.#db.run(sql, [c.Code], (err) => {
            //             if (err) {
            //                 reject(503);
            //             }
            //         })
            //     })
            // })

            // const sql = 'DELETE FROM STUDY_PLAN WHERE userID=?';
            // this.#db.run(sql, [userID], (err) => {
            //     if (err) {
            //         reject(503);
            //     }
            // })


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

            const sql_delete = 'DELETE FROM OPTION WHERE userID==?';
            this.#db.run(sql_delete, [userID], (err) => {
                if (err) {
                    reject(503);
                }
                resolve(200);
            })

            const sql = 'DELETE FROM STUDY_PLAN WHERE userID==?;'
            this.#db.run(sql, [userID], (err) => {
                if (err) {
                    reject(503);
                }
                resolve(200);
            })
        })

    }

    // destroy_studyPlan_DB(userID) {
    //     return new Promise((resolve, reject) => {

    //         // Decrements enrollments



    //         const sql = 'DELETE FROM STUDY_PLAN WHERE userID==?'
    //         this.#db.all(sql, [userID], (err, rows) => {
    //             if (err) {
    //                 reject(503);
    //             }
    //             resolve(200);
    //         })
    //     })

    // }

    // confirm_studyPlan_DB(userID) {
    //     return new Promise((resolve, reject) => {
    //         const sql = 'UPDATE STUDY_PLAN SET confirmed=1 WHERE userID=?'
    //         this.#db.all(sql, [userID], (err, rows) => {
    //             if (err) {
    //                 reject(503);
    //             }
    //             resolve(200);
    //         })
    //     })

    // }

    remove_course_from_sp_DB(userID, code) {
        return new Promise((resolve, reject) => {

            const check_code = 'SELECT COUNT(1) FROM STUDY_PLAN WHERE courseCode=? AND userID=?';

            let exist = 0;

            this.#db.all(check_code, [code, userID], (err, result) => {

                if (err) {
                    reject(503);
                } else {

                    result[0]['COUNT(1)'] > 0 ? exist = 1 : exist;

                    if (exist) {
                        const sql = 'DELETE FROM STUDY_PLAN WHERE userID=? AND courseCode=?'
                        this.#db.all(sql, [userID, code], (err, rows) => {
                            if (err) {
                                reject(503);
                            }
                            resolve(204);
                        })
                    } else {
                        reject(404);
                    }


                }
            })

        }
        )
    }
}

module.exports = StudyPlanDAO;