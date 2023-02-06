const express = require('express');
const {createSubject, getChapter, createQuestions, getQuestions} = require('./controllers/subject');
const { createUser, login, getUser } = require('./controllers/userController');
const router = express.Router();

router.post('/createUser',createUser)
router.post('/login',login)

router.post('/createSubject', createSubject)
router.post('/createQuestions', createQuestions)
router.get('/getSubjects/:subject',getChapter)

router.get('/getQuestions/:topic',getQuestions)




module.exports=router;