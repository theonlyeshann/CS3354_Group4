// Load environment variables
const { loadEnvFile } = require('node:process');
loadEnvFile('./keysync/server/.env');

const mysql = require('mysql2');

const con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Successfully connected to DB");
  con.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
  con.query(`USE ${process.env.DB_NAME}`);
  con.query(`DROP TABLE IF EXISTS ${process.env.LOGIN_TABLE_NAME};`);
  con.query(`CREATE TABLE IF NOT EXISTS ${process.env.LOGIN_TABLE_NAME} (UserID int, Username varchar(20) UNIQUE, Password varchar(20));`);
  con.query(`INSERT IGNORE INTO ${process.env.LOGIN_TABLE_NAME} VALUES (1, 'test', 'admin123');`); // Inject sample user
});

module.exports = {
  con
}