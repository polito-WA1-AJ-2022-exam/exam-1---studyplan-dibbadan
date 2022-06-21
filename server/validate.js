const CourseDAO = require('./dao/course_DAO');
const course_dao = new CourseDAO();

async function validatePlan(studyPlan) {
    let ret = check_incompatibility(studyPlan);
    ret += await check_enrollment(studyPlan);
    if(ret > 0) {
        // Return 0 if the plan is not valid
        return 0;
    } else {
        // Return 1 if the plan is valid
        return 1;
    }
}



// Return 1 if one or more incompatible courses are present in the StudyPlan
function check_incompatibility(studyPlan) {
    let incompatible_courses = [];
    
    
    studyPlan.forEach((c) => {
        if(c.Incompatible_Courses !== null) {
            c.Incompatible_Courses.forEach((inc) => {
                incompatible_courses.push(inc);
            })
        }
    })


    if(studyPlan.includes(incompatible_courses)) {
        return 1;
    } else {
        return 0;
    }
}

// Return 1 if one or more courses have reached the maximum number of students enrolled
async function check_enrollment(studyPlan) {
        
        let full = 0;

        studyPlan.forEach(async (course) => {
            let c = await course_dao.get_course_by_Code_DB(course.Code);
            if(c.Max_Students === c.Enrolled_In) {
                full = 1;
                return full;
            }
        })
}

module.exports = {validatePlan}