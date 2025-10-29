const express = require('express');
const router = express.Router();
auth_controller = require('./auth_controller.js');

// Default/login page
router.post('/login', auth_controller.loginUser);

module.exports = {
  router
};