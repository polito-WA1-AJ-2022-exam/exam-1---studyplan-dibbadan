'use strict'

const express = require('express');
const router = express.Router();

const CourseDAO = require('../dao/course_DAO');
const CourseService = require('../services/course_service');

const course_dao = new CourseDAO();
const course_service = new CourseService(course_dao);


router.get("/courses", course_service.get_courses);

module.exports = router;