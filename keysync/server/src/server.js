// Load environment variables
const { loadEnvFile } = require('node:process');
loadEnvFile('./keysync/server/.env');

const cors = require('cors');
const express = require('express');
const app = express();

const auth = require('./auth_router');
const main = require('./main_router');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/login', auth.router);
app.use('/main', main.router);

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
}); 

