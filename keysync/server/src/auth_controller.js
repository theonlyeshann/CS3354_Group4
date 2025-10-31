// Load environment variables
const { loadEnvFile } = require('node:process');
loadEnvFile('./keysync/server/.env');

db = require('./database.js');

function loginUser(req, res) {
  user = req.body.username;
  pw = req.body.password;

  db.con.query(`SELECT Username, Password FROM ${process.env.LOGIN_TABLE_NAME} WHERE Username = '${user}'`, (err, results) => {
    if (err)  {
      res.status(500).send(`Error encountered whilst looking for user: ${err}`);
    }
    else if (results.length == 0) {
      res.status(404).send("Could not find username");
    }
    else if (results[0].Password == pw) {
      res.redirect("/main");
    }
    else  {
      res.status(400).send("Incorrect password");
    }
  });
}

module.exports = {
  loginUser
}