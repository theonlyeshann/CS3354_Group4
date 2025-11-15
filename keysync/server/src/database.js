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
  con.query(`DROP TABLE IF EXISTS ${process.env.PASSWORD_TABLE_NAME}`);
  con.query(`DROP TABLE IF EXISTS ${process.env.LOGIN_TABLE_NAME}`);
  con.query(`CREATE TABLE IF NOT EXISTS ${process.env.LOGIN_TABLE_NAME} (UserID int, Username varchar(20) UNIQUE, Password varchar(20), PRIMARY KEY (UserID))`);
  con.query(`CREATE TABLE IF NOT EXISTS ${process.env.PASSWORD_TABLE_NAME} (UserID int, Site varchar(2000), Username varchar(255), Password varchar(255), FOREIGN KEY (UserID) REFERENCES ${process.env.LOGIN_TABLE_NAME}(UserID))`);
  con.query(`INSERT IGNORE INTO ${process.env.LOGIN_TABLE_NAME} VALUES (1, 'test', 'admin123')`); // Inject sample user
});

module.exports = {
  pool
}