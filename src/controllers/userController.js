const userModel = require('../models/user');
require('dotenv').config();
const jwt = require('jsonwebtoken')
const createUser = async function (req, res) {
  try {
    let data = req.body;

    let { fname, lname, mobile, email, password } = data;

    // if (!isValid(fname)) {
    //   return res
    //     .status(400)
    //     .send({ status: false, message: 'Please provide contact of the user' });
    // }

    // if (!isValid(lname)) {
    //   return res
    //     .status(400)
    //     .send({ status: false, message: 'Please provide contact of the user' });
    // }

    // if (!isValid(mobile)) {
    //   return res
    //     .status(400)
    //     .send({ status: false, message: 'Please provide contact of the user' });
    // }
    let checkEmail = await userModel.findOne({ email: email });
    if (checkEmail) {
      return res
        .status(400)
        .send({ status: false, error: 'Email id is already registered' });
    }

    // if (!isValid(password)) {
    //   return res
    //     .status(400)
    //     .send({
    //       status: false,
    //       message: 'Please provide password of the user',
    //     });
    // }
    // if (!isValidPassword.test(password)) {
    //   return res
    //     .status(400)
    //     .send({ status: false, message: 'Please enter valid password' });
    // }

    const createUser = await userModel.create(data);
    return res.status(201).send({
      status: true,
      message: 'user created successfully',
    });
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
};

const login = async function (req, res) {
  try {
    let data = req.body;
    let { email, password } = data;

    const checkData = await userModel.findOne({
      email: email,
      password: password,
    });
    if (!checkData) {
      return res.status(404).send({
        status: false,
        error: 'Credentials are Incorrect, Try Again',
      });
    }

    const token = jwt.sign(
      {
        userId: checkData._id,
        email,
      },
      process.env.JWT_SecretKey,
      { expiresIn: '1d' }
    );
    return res
      .status(200)
      .send({ status: true, message: 'your token', data: token });
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
};

const getUser = async function (req, res) {
  try {

    const checkData = await userModel.find();
    if (!checkData) {
      return res.status(404).send({
        status: false,
        error: 'No data Found',
      });
    }
    return res
      .status(200)
      .send({ status: true, data: checkData });
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
};

module.exports = { createUser, login ,getUser};
