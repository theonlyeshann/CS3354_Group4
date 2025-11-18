// Load environment variables
const { loadEnvFile } = require('node:process');
const crypto = require('crypto');
loadEnvFile('./keysync/server/.env');

const { initializePool } = require('./database.js');

async function retrievePasswords(req, res) {  
  const pool = await initializePool();

  const con = await pool.getConnection();

  try {
    const [results] = await con.query(`SELECT Site, Username, Password FROM ${process.env.PASSWORD_TABLE_NAME} WHERE UserID = ${req.session.userId}`);
    res.status(200).json(results);
  }
  catch (err) {
    res.status(500).send(`Error encountered whilst querying database: ${err}`);
  }
  await con.release();
}

async function addPassword(req, res) {  
  const site = req.body.site;
  const user = req.body.username;
  const pw = crypto.createHash('sha256').update(req.body.password).digest('hex');

  const pool = await initializePool();

  const con = await pool.getConnection();

  try {
    const [results] = await con.query(`INSERT INTO ${process.env.PASSWORD_TABLE_NAME} VALUES (${req.session.userId}, '${site}', '${user}', '${pw}')`);
    res.status(200).send("Successfully added password");
  }
  catch (err) {
    res.status(500).send(`Error encountered whilst adding user: ${err}`);
  }
  await con.release();
}

async function editPassword(req, res) {  
  const site = req.body.site;
  const user = req.body.username;
  const pw = crypto.createHash('sha256').update(req.body.password).digest('hex');

  const pool = await initializePool();

  const con = await pool.getConnection();

  try {
    const [results] = await con.query(`UPDATE ${process.env.PASSWORD_TABLE_NAME} SET Username = '${user}', Password = '${pw}' WHERE UserID = ${req.session.userId} AND Site = '${site}'`);
    res.status(200).send("Successfully edited password");
  }
  catch (err) {
    res.status(500).send(`Error encountered whilst editing user: ${err}`);
  }
  await con.release();
}

async function deletePassword(req, res) {  
  const site = req.body.site;
  const user = req.body.username;
  const pw = req.body.password.length == 64? req.body.password : crypto.createHash('sha256').update(req.body.password).digest('hex');

  const pool = await initializePool();

  const con = await pool.getConnection();

  try {
    const [results] = await con.query(`DELETE FROM ${process.env.PASSWORD_TABLE_NAME} WHERE Site='${site}' AND Username='${user}' AND Password='${pw}'`);
    res.status(200).send("Successfully deleted password");
  }
  catch (err) {
    res.status(500).send(`Error encountered whilst deleting user: ${err}`);
  }
  await con.release();
}

async function logOut(req, res) {  
  try {
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.status(200).send("Successfully logged out");
  }
  catch (err) {
    res.status(500).send(`Error encountered whilst logging out: ${err}`);
  }
}

module.exports = {
  retrievePasswords,
  addPassword,
  editPassword,
  deletePassword,
  logOut
}