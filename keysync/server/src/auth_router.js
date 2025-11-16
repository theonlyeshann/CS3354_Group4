const express = require('express');
const router = express.Router();
auth_controller = require('./auth_controller.js');

router.post('/', auth_controller.loginUser);

module.exports = {
  router
};