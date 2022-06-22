'use strict'

function Course(Code, Name, Credits, Max_Students, Enrolled_In, Incompatible_Courses, Preparatory_Course) {
    this.Code = Code;
    this.Name = Name;
    this.Credits = Credits;
    this.Max_Students = Max_Students;
    this.Enrolled_In = Enrolled_In;
    if(Incompatible_Courses !== null) {
        this.Incompatible_Courses = Incompatible_Courses.split(',');
    } else {
        this.Incompatible_Courses = null;
    }
    this.Preparatory_Course = Preparatory_Course;
}

module.exports = {Course};