// Load environment variables
const { loadEnvFile } = require('node:process');
loadEnvFile('./keysync/server/.env');

db = require('./database.js');

function verifyLoginSession(req, res, next) {
  console.log(req.session);
  if (!req.session.userId) {
    return res.status(401).send('Unauthorized');
  }
  else  {
    next();
  }
}

function addPassword(req, res) {  
  let site = req.body.site;
  let user = req.body.username;
  let pw = req.body.password;

  db.pool.getConnection(function(err, con) {
    if (err) throw err;
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