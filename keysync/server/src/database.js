// Load environment variables
const { loadEnvFile } = require('node:process');
loadEnvFile('keysync/server/.env');

let mysql = require('mysql2');

let con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Successfully connected to DB server");
  con.query("CREATE DATABASE IF NOT EXISTS keysync", function (err) {
    if (err) throw err;
  });
});