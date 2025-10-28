// Load environment variables
const { loadEnvFile } = require('node:process');
loadEnvFile('server/.env');

const express = require('express');
const app = express();
const login = require('./login_router');

app.use(express.urlencoded({ extended: true }));

app.use('/', login);

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
}); 

