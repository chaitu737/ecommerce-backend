const express = require('express');
const Router = express.Router();
const userController = require('../controllers/userController');
const appConfig = require('../config/appConfig');

module.exports.setRouter=(app)=>{
    let baseUrl = `${appConfig.apiVersion}/users`;


    app.post(`${baseUrl}/register`, userController.signUpfunction);
}