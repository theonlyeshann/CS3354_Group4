import assert from 'node:assert/strict';

// Login test case - valid username and password
var response = await fetch('http://localhost:8080/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json' 
  },
  body: JSON.stringify({
    username: 'test',
    password: 'admin123'
  })  
});
assert.strictEqual(200, response.status);

// Login test case - valid username, invalid/incorrect password
response = await fetch('http://localhost:8080/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json' 
  },
  body: JSON.stringify({
    username: 'test',
    password: 'admin'
  })  
});
assert.strictEqual(400, response.status);

// Login test case - exceptional username (user not found in DB), valid password
response = await fetch('http://localhost:8080/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json' 
  },
  body: JSON.stringify({
    username: 'test123',
    password: 'admin123'
  })  
});
assert.strictEqual(404, response.status);

// Logout test case
response = await fetch('http://localhost:8080/main/logout', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json' 
  }
});
assert.strictEqual(200, response.status);

// Display main page test case - invalid credentials (not logged in/timed out of session)
response = await fetch('http://localhost:8080/main/');
assert.strictEqual(401, response.status);