// Load environment variables
const { loadEnvFile } = require('node:process');
loadEnvFile('./keysync/server/.env');

const mysql = require('mysql2/promise');

let pool;

async function initializePool() {
  if (pool) return pool;

  const initConnection = await mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD
  });

  await initConnection.query(`DROP DATABASE IF EXISTS ${process.env.DB_NAME}`);
  await initConnection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);

  await initConnection.end();

  pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 3
  });

  try {
    const con = await pool.getConnection();
    await con.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    await con.query(`USE ${process.env.DB_NAME}`);
    await con.query(`CREATE TABLE IF NOT EXISTS ${process.env.LOGIN_TABLE_NAME} (UserID varchar(40), Username varchar(256) UNIQUE, Password varbinary(256), PRIMARY KEY (UserID))`);
    await con.query(`CREATE TABLE IF NOT EXISTS ${process.env.PASSWORD_TABLE_NAME} (UserID varchar(40), Site varchar(2000), Username varchar(2000), Password varbinary(256), FOREIGN KEY (UserID) REFERENCES ${process.env.LOGIN_TABLE_NAME}(UserID))`);
  }
  catch {
    throw err;
  }

  return pool;
}

module.exports = {
  initializePool
}