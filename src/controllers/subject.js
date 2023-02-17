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
const createQuestion = async function (req, res) {
    try {
       let {data} = req.body
        let Class = await data.forEach(element => {
            let {options} = element
            options = options.split(",")
            element.options = options
            questionModel.insertMany(element)
        });
        // const Class = await questionModel.create(req.body);
        return res
            .status(200)
            .send({ status: true, data:Class });
    } catch (error) {
        return res.status(500).send({ status: false, error: error.message });
    }
};
const createQuestions = async function (req, res) {
    try {
        const { data } = req.body;
        const questionPromises = data.map(async (element) => {
            const { options } = element;
            const optionsArray = options.split(",");
            element.options = optionsArray;
            return questionModel.create(element);
        });
        const questions = await Promise.all(questionPromises);
        return res.status(200).send({ status: true, data: questions });
    } catch (error) {
        return res.status(500).send({ status: false, error: error.message });
    }
};

const getChapter = async function (req, res) {
    try {
        const subjects = await subjectModel.find();
        if (!subjects.length) {
            return res.status(404).send({
                status: false,
                error: 'No data Found',
            });
        }
        return res
            .status(200)
            .send( subjects );
    } catch (error) {
        return res.status(500).send({ status: false, error: error.message });
    }
};
const getQuestions = async function (req, res) {
    try {
        let {topic,size} = req.params
        topic = topic.split("-").join(" ")
        size = Number(size)
        const questions = await questionModel.aggregate([
            { $match: { topic } }, // filter documents
            { $sample: { size:5 } } // sample 5 documents
          ])
          
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




module.exports = {getChapter,createSubject,createQuestion,getQuestions,createQuestions}
