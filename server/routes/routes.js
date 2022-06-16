'use strict'

const express = require('express');
const router = express.Router();

const CourseDAO = require('../dao/course_DAO');
const CourseService = require('../services/course_service');
const StudyPlanDAO = require('../dao/study_plan_DAO');
const StudyPlan_Service = require('../services/studyPlan_service');

const course_dao = new CourseDAO();
const course_service = new CourseService(course_dao);
const studyplan_dao = new StudyPlanDAO();
const studyplan_service = new StudyPlan_Service(studyplan_dao);


router.get("/courses", course_service.get_courses);
router.post("/init", studyplan_service.studyPlan_init);
router.get("/option", studyplan_service.get_option);
router.get("/studyplan", studyplan_service.get_studyPlan);
router.post("/newStudyPlan", studyplan_service.post_studyPlan);
// router.delete("/removeCourseSP/:code", studyplan_service.remove_course_from_sp);
router.put("/confirm", studyplan_service.confirm_studyPlan);
router.put("/enroll/:code", course_service.update_enrollments);
router.put("/unsubscribe/:code", course_service.unsubscribe_course);
router.delete("/destroy", studyplan_service.destroy_studyPlan);


module.exports = router;