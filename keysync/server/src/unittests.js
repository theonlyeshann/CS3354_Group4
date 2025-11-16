import assert from 'node:assert/strict';
import request from 'supertest';
import app from './server.js';

let agent = request.agent(app);

// Login test case - valid username and password
await agent
.post('/login')
.send({username: 'test', password: 'admin123'})
.set('Content-Type', 'application/json')
.expect(response =>  {
  assert.strictEqual(response.status, 200);
});

// Login test case - valid username, invalid/incorrect password
await agent
.post('/login')
.send({username: 'test', password: 'admin'})
.set('Content-Type', 'application/json')
.expect(response =>  {
  assert.strictEqual(response.status, 400);
});

// Login test case - exceptional username (user not found in DB), valid password
await agent
.post('/login')
.send({username: 'test123', password: 'admin123'})
.set('Content-Type', 'application/json')
.expect(response =>  {
  assert.strictEqual(response.status, 404);
});

// Logout test case
await agent
.post('/main/logout')
.set('Content-Type', 'application/json')
.expect(response =>  {
  assert.strictEqual(response.status, 200);
});

// Display main page test case - invalid credentials (not logged in/timed out of session)
await agent
.get('/main')
.expect(response =>  {
  assert.strictEqual(response.status, 401);
});

// Add password test case - invalid credentials (not logged in/timed out of session)
await agent
.post('/main/add')
.send({site: 'google.com', username: 'dafssdf', password: 'dsafsdd'})
.set('Content-Type', 'application/json')
.expect(response =>  {
  assert.strictEqual(response.status, 401);
});

// Edit password test case - invalid credentials (not logged in/timed out of session)
await agent
.post('/main/edit')
.send({site: 'google.com', username: 'dafssdf', password: 'dsafsdd'})
.set('Content-Type', 'application/json')
.expect(response =>  {
  assert.strictEqual(response.status, 401);
});

// Delete password test case - invalid credentials (not logged in/timed out of session)
await agent
.delete('/main/delete')
.send({site: 'google.com', username: 'dafssdf', password: 'dsafsdd'})
.set('Content-Type', 'application/json')
.expect(response =>  {
  assert.strictEqual(response.status, 401);
});

// Add password test case - valid credentials
await agent
.post('/login')
.send({username: 'test', password: 'admin123'})
.set('Content-Type', 'application/json')
.expect(200);

await agent
.post('/main/add')
.send({site: 'google.com', username: 'dafssdf', password: 'dsafsdd'})
.set('Content-Type', 'application/json')
.expect(response =>  {
  assert.strictEqual(response.status, 200);
});

// Edit password test case - valid credentials
await agent
.post('/main/edit')
.send({site: 'google.com', username: 'dafssdf', password: 'dsafsdd'})
.set('Content-Type', 'application/json')
.expect(response =>  {
  assert.strictEqual(response.status, 200);
});

// Delete password test case - valid credentials
await agent
.delete('/main/delete')
.send({site: 'google.com', username: 'dafssdf', password: 'dsafsdd'})
.set('Content-Type', 'application/json')
.expect(response =>  {
  assert.strictEqual(response.status, 200);
});