// Load environment variables
const { loadEnvFile } = require('node:process');
loadEnvFile('./keysync/server/.env');

const cors = require('cors');
const session = require('express-session');
const express = require('express');
const app = express();

const auth = require('./auth_router');
const main = require('./main_router');

app.use(session({
  secret: 'test',
  resave: false,
  saveUninitialized: true,
  sameSite: 'none'
}));
app.use(cors({
  credentials: true,
  origin: "http://localhost:3000"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/login', auth.router);
app.use('/main', main.router);

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
}); 

module.exports = app;