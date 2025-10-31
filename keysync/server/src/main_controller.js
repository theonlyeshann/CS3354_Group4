// Load environment variables
const { loadEnvFile } = require('node:process');
loadEnvFile('./keysync/server/.env');

db = require('./database.js');

function addPassword(req, res) {
  let site = req.body.site;
  let user = req.body.username;
  let pw = req.body.password;
  let userID = -1;

  db.pool.getConnection(function(err, con) {
    if (err) throw err;
    con.query(`SELECT UserID FROM ${process.env.LOGIN_TABLE_NAME} WHERE Username = '${user}';`, (err, results) => {
    if (err)  {
      res.status(500).send(`Error encountered whilst locating user ID: ${err}`);
    }
    userID = results[0].userID;
    });
    con.query(`INSERT INTO ${process.env.PASSWORD_TABLE_NAME} (Site, Username, Password) VALUES ('${site}', '${user}', '${pw}')`, (err, results) => {
    if (err)  {
      res.status(500).send(`Error encountered whilst adding user: ${err}`);
    }
    else  {
      res.status(200).send("Successfully added password");
    }
    });
    con.release();
  });
}

module.exports = {
  addPassword
}