// Load environment variables
const { loadEnvFile } = require('node:process');
loadEnvFile('server/.env');

const express = require('express');
const app = express();
const port = process.env.PORT;
const login = require('./login_router');

app.use('/', login)

// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
}); 

