const express = require('express');
const router = express.Router();
main_controller = require('./main_controller.js');

router.post('/add', main_controller.addPassword);

module.exports = {
  router
};