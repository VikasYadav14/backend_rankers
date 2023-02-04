const express = require('express');
const { createUser, login, getUser } = require('./controllers/userController');
const router = express.Router();

router.post('/createUser',createUser)
router.post('/login',login)

router.get('/getUser',getUser)





module.exports=router;