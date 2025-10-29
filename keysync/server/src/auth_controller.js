// Load environment variables
const { loadEnvFile } = require('node:process');
loadEnvFile('server/.env');

db = require('./database.js');

function loginUser(req, res, next) {
  user = req.body.username;
  pw = req.body.password;

  db.con.query(`SELECT Username, Password FROM ${process.env.LOGIN_TABLE_NAME} WHERE Username = '${user}'`, (err, results) => {
    if (err)  {
      console.log("Could not find username");
    }
    else if (results[0].Password == pw) {
      console.log("Successful login");
      res.redirect("/");
    }
    else  {
      console.log("Incorrect password");
    }
  });
}

module.exports = {
  loginUser
}