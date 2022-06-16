'use strict'

class Course_Service {
    
    #dao = null;

    constructor(dao) {
        this.#dao = dao;
    }

    get_courses = async(req,res) => {   
        this.#dao.get_all_courses_DB().then((courses) => {           
            return res.status(200).json(courses).end();
        }).catch((error) => res.status(error).json("Something was wrong!").end());
    }

    update_enrollments = async(req,res) => {  
        this.#dao.update_enrollments_DB(req.params.code).then(() => {           
            return res.status(200).json("Enrolled!").end();
        }).catch((error) => res.status(error).json("Something was wrong!").end());
    }

    unsubscribe_course = async(req,res) => {  
        this.#dao.unsubscribe_course_DB(req.params.code).then(() => {           
            return res.status(200).json("Unsubscribed!").end();
        }).catch((error) => res.status(error).json("Something was wrong!").end());
    }
}

module.exports = Course_Service;