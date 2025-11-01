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

router.get('/', verifyLoginSession, main_controller.retrievePasswords);
router.post('/add', verifyLoginSession, main_controller.addPassword);
router.delete('/delete', verifyLoginSession, main_controller.deletePassword);

module.exports = {
  router
};