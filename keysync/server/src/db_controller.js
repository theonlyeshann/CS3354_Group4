const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World from Express!');
});

// Start the server
app.listen(() => {
  console.log(`Example app listening at http://localhost:${8080}`);
}); 

