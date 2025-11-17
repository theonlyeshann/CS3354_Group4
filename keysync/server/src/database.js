// Load environment variables
const { loadEnvFile } = require('node:process');
loadEnvFile('./keysync/server/.env');

const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 3
});

pool.getConnection(function(err, con) {
  if (err) throw err;
  console.log("Successfully connected to DB");
  con.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
  con.query(`USE ${process.env.DB_NAME}`);
  con.query(`CREATE TABLE IF NOT EXISTS ${process.env.LOGIN_TABLE_NAME} (UserID int, Username varchar(256) UNIQUE, Password varchar(256), PRIMARY KEY (UserID))`);
  con.query(`CREATE TABLE IF NOT EXISTS ${process.env.PASSWORD_TABLE_NAME} (UserID int, Site varchar(2000), Username varchar(2000), Password varchar(256), FOREIGN KEY (UserID) REFERENCES ${process.env.LOGIN_TABLE_NAME}(UserID))`);
  con.query(`INSERT IGNORE INTO ${process.env.LOGIN_TABLE_NAME} VALUES (1, SHA2('test', 256), SHA2('admin123', 256))`); // Inject sample user
});

module.exports = {
  pool
}