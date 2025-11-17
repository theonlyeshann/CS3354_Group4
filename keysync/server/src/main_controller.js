// Load environment variables
const { loadEnvFile } = require('node:process');
const crypto = require('crypto');
loadEnvFile('./keysync/server/.env');

db = require('./database.js');

function retrievePasswords(req, res) {  
  db.pool.getConnection(function(err, con) {
    if (err) throw err;
    con.query(`SELECT Site, Username, Password FROM ${process.env.PASSWORD_TABLE_NAME} WHERE UserID = ${req.session.userId}`, (err, results) => {
    if (err)  {
      res.status(500).send(`Error encountered whilst querying database: ${err}`);
    }
    else  {
      res.status(200).json(results);
    }
    });
    con.release();
  });
}

function addPassword(req, res) {  
  let site = req.body.site;
  let user = req.body.username;
  let pw = crypto.createHash('sha256').update(req.body.password).digest('hex');

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

function editPassword(req, res) {  
  let site = req.body.site;
  let user = req.body.username;
  let pw = crypto.createHash('sha256').update(req.body.password).digest('hex');

  db.pool.getConnection(function(err, con) {
    if (err) throw err;
    con.query(`UPDATE ${process.env.PASSWORD_TABLE_NAME} SET Username = '${user}', Password = '${pw}' WHERE UserID = ${req.session.userId} AND Site = '${site}'`, (err, results) => {
    if (err)  {
      res.status(500).send(`Error encountered whilst editing user: ${err}`);
    }
    else  {
      res.status(200).send("Successfully edited password");
    }
    });
    con.release();
  });
}

function deletePassword(req, res) {  
  let site = req.body.site;
  let user = req.body.username;
  let pw = req.body.password.length == 64? req.body.password : crypto.createHash('sha256').update(req.body.password).digest('hex');

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

function logOut(req, res) {  
  req.session.destroy((err) =>  {
    if (err)  {
      res.status(500).send(`Error encountered whilst logging out: ${err}`);
    }
    else  {
      res.clearCookie('connect.sid');
      res.status(200).send("Successfully logged out");
    }
  });
}

module.exports = {
  retrievePasswords,
  addPassword,
  editPassword,
  deletePassword,
  logOut
}