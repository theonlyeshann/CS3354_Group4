// Load environment variables
const { loadEnvFile } = require('node:process');
loadEnvFile('./keysync/server/.env');

db = require('./database.js');

function retrievePasswords(req, res) {  
  db.pool.getConnection(function(err, con) {
    if (err) throw err;
    con.query(`SELECT Site, Username, Password FROM ${process.env.PASSWORD_TABLE_NAME} WHERE UserID = ${req.session.userId}`, (err, results) => {
    if (err)  {
      res.status(500).send(`Error encountered whilst querying database: ${err}`);
    }
    else if (results.length == 0) {
      res.status(404).send(`Database is empty`);
    }
    else  {
      console.log(results);
      res.status(200).send("Successfully retrieved database");
    }
    });
    con.release();
  });
}

function addPassword(req, res) {  
  let site = req.body.site;
  let user = req.body.username;
  let pw = req.body.password;

  db.pool.getConnection(function(err, con) {
    if (err) throw err;
    con.query(`INSERT INTO ${process.env.PASSWORD_TABLE_NAME} VALUES (${req.session.userId}, '${site}', '${user}', '${pw}')`, (err, results) => {
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

function deletePassword(req, res) {  
  let site = req.body.site;
  let user = req.body.username;
  let pw = req.body.password;

  db.pool.getConnection(function(err, con) {
    if (err) throw err;
    con.query(`DELETE FROM ${process.env.PASSWORD_TABLE_NAME} WHERE Site='${site}' AND Username='${user}' AND Password='${pw}'`, (err, results) => {
    if (err)  {
      res.status(500).send(`Error encountered whilst deleting user: ${err}`);
    }
    else  {
      res.status(200).send("Successfully deleted password");
    }
    });
    con.release();
  });
}

module.exports = {
  retrievePasswords,
  addPassword,
  deletePassword
}