const express = require('express');
const router = express.Router();
main_controller = require('./main_controller.js');

function verifyLoginSession(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).send('Unauthorized');
  }
  else  {
    next();
  }
}

router.post('/add', verifyLoginSession, main_controller.addPassword);

module.exports = {
  router
};