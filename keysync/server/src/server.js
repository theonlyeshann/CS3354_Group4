// Load environment variables
const { loadEnvFile } = require('node:process');
loadEnvFile('./keysync/server/.env');

const express = require('express');
const app = express();
const auth = require('./auth_router');

app.use(express.urlencoded({ extended: true }));

app.use('/login', auth.router);

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
}); 

