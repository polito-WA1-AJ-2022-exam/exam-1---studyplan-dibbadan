'use strict'

const { validatePlan } = require("../validate");


class StudyPlan_Service {

    #dao = null;

    constructor(dao) {
        this.#dao = dao;
    }

    studyPlan_init = async (req, res) => {

        if (req.user === undefined) {
            res.status(401).json("You are not authenticated!").end();
            return;
        }

        this.#dao.studyPlan_init_DB(req.user.id, req.body).then(() => {
            return res.status(201).json("Empty Study Plan created!").end();
        }).catch((error) => res.status(error).json("Something was wrong!").end());
    }

    get_option = async (req, res) => {

        if (req.user === undefined) {
            res.status(401).json("You are not authenticated!").end();
            return;
        }

        this.#dao.get_option_DB(req.user.id).then((option) => {
            return res.status(200).json(option).end();
        }).catch((error) => res.status(error).json("Something was wrong!").end());
    }


    get_studyPlan = async (req, res) => {

        if (req.user === undefined) {
            res.status(401).json("You are not authenticated!").end();
            return;
        }

        this.#dao.get_studyPlan_DB(req.user.id).then((studyPlan) => {
            return res.status(200).json(studyPlan).end();
        }).catch((error) => res.status(error).json("Something was wrong!").end());
    }

    post_studyPlan = async (req, res) => {

        if (req.user === undefined) {
            res.status(401).json("You are not authenticated!").end();
            return;
        }

        // Validate StudyPlan
        let valid = await validatePlan(req.body);

        if (valid) {
            this.#dao.post_studyPlan_DB(req.user.id, req.body).then(() => {
                res.status(201).json("Study plan has been created!").end();
            }).catch((error) => res.status(error).json("Something was wrong!").end());
        } else {
            res.status(422).json("Study Plan is not valid! Cannot be created!").end();
        }
    }


    destroy_studyPlan = async (req, res) => {

        if (req.user === undefined) {
            res.status(401).json("You are not authenticated!").end();
            return;
        }

        this.#dao.destroy_studyPlan_DB(req.user.id, req.body).then(() => {
            return res.status(200).json("Destroyed!").end();
        }).catch((error) => res.status(error).json("Something was wrong!").end());
    }





}

module.exports = StudyPlan_Service;