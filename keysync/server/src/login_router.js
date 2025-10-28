const express = require('express');
const router = express.Router();

// Default/login page
router.post('/', (req, res) => {
  user = req.body.username;
  pw = req.body.password;
  console.log(`${user}, ${pw}`);
});

module.exports = router;