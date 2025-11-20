// Load environment variables
const { loadEnvFile } = require('node:process');
const crypto = require('crypto');
loadEnvFile('./keysync/server/.env');

const { initializePool } = require('./database.js');

async function loginUser(req, res) {
  const user = crypto.createHash('sha256').update(req.body.username).digest('hex');
  const pw = crypto.createHash('sha256').update(req.body.password).digest('hex');

  const pool = await initializePool();

  const con = await pool.getConnection();

  try {
    const [results] = await con.query(`SELECT UserID, Username, Password FROM ${process.env.LOGIN_TABLE_NAME} WHERE Username = '${user}'`);
    if (results.length == 0) {
      res.status(404).send("Could not find username");
    }
    else if (results[0].Password == pw) {
      req.session.userId = results[0].UserID;
      res.status(200).send("Successful login");
    }
    else  {
      res.status(400).send("Incorrect password");
    }
  }
  catch (err) {
    res.status(500).send(`Error encountered whilst logging in: ${err}`);
  }
  await con.release();
}

async function createAccount(req, res) {
  const user = crypto.createHash('sha256').update(req.body.username).digest('hex');
  const pw = crypto.createHash('sha256').update(req.body.password).digest('hex');

  const pool = await initializePool();

  const con = await pool.getConnection();

  try {
    await con.query(`INSERT INTO ${process.env.LOGIN_TABLE_NAME} VALUES ('${crypto.randomUUID()}', '${user}', '${pw}')`);
    res.status(200).send("Successfully created account");
  }
  catch (err) {
    res.status(500).send(`Error encountered whilst creating account: ${err}`);
  }
  await con.release();
}

module.exports = {
  loginUser,
  createAccount
}