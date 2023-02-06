const subjectModel = require("../models/subjectModel");
const questionModel = require("../models/question");

const createSubject = async function (req, res) {
    try {
        let {topics} = req.body
        topics = topics.split(",")
        req.body.topics = topics
        const Class = await subjectModel.create(req.body);
        return res
            .status(200)
            .send({ status: true, data: Class });
    } catch (error) {
        return res.status(500).send({ status: false, error: error.message });
    }
};
const createQuestions = async function (req, res) {
    try {
        let {options} = req.body
        options = options.split(",")
        req.body.options = options
        const Class = await questionModel.create(req.body);
        return res
            .status(200)
            .send({ status: true, data: Class });
    } catch (error) {
        return res.status(500).send({ status: false, error: error.message });
    }
};

const getChapter = async function (req, res) {
    try {
        const {subject} = req.params
        const subjects = await subjectModel.find({subject});
        if (!subjects.length) {
            return res.status(404).send({
                status: false,
                error: 'No data Found',
            });
        }
        return res
            .status(200)
            .send({ status: true, data: subjects });
    } catch (error) {
        return res.status(500).send({ status: false, error: error.message });
    }
};
const getQuestions = async function (req, res) {
    try {
        const {topic} = req.params
        const questions = await questionModel.find({topic});
        if (!questions.length) {
            return res.status(404).send({
                status: false,
                error: 'No data Found',
            });
        }
        return res
            .status(200)
            .send({ status: true, data: questions });
    } catch (error) {
        return res.status(500).send({ status: false, error: error.message });
    }
};

module.exports = {getChapter,createSubject,createQuestions,getQuestions}
