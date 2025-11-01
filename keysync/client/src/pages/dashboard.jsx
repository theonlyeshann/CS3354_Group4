import { useState } from 'react';

export default function Dashboard({onLoginSuccess}) {
  const [site, setSite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const addPassword = async () => {
    if (!site || !username || !password) {
      setMessage('Please fill in all fields');
      return;
    }

    setMessage('');

    try {
      const response = await fetch('http://localhost:8080/main/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          site: site,
          username: username,
          password: password
        })
      });

      const data = await response;

      if (response.status == 200) {
        setMessage(data.message || 'Added password');
        
        if (data.token) {
          console.log('Auth token received:', data.token);
        }
      }
      else {
        setMessage(data.message || 'Failed to add password');
      }
    } catch (error) {
      setMessage('Could not add password. Please try again.');
      console.error('Error adding password:', error);
    }
  };

  const deletePassword = async () => {
    if (!site || !username || !password) {
      setMessage('Please fill in all fields');
      return;
    }

    setMessage('');

    try {
      const response = await fetch('http://localhost:8080/main/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          site: site,
          username: username,
          password: password
        })
      });

      const data = await response;

      if (response.status == 200) {
        setMessage(data.message || 'Deleted password');
        
        if (data.token) {
          console.log('Auth token received:', data.token);
        }
      }
      else {
        setMessage(data.message || 'Failed to delete password');
      }
    } catch (error) {
      setMessage('Could not delete password. Please try again.');
      console.error('Error deleting password:', error);
    }
  };

  const logOut = async () => {
    try {
      const response = await fetch('http://localhost:8080/main/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      const data = await response;

      if (response.status == 200) {
        onLoginSuccess();
        setMessage(data.message || 'Logged out');
        
        if (data.token) {
          console.log('Auth token received:', data.token);
        }
      }
      else {
        setMessage(data.message || 'Failed to log out');
      }
    } catch (error) {
      setMessage('Could not log out. Please try again.');
      console.error('Error logging out:', error);
    }
  };

 return (
  <>
  <button type="button"
  onClick={addPassword}>Add Password</button>
  <button type="button"
  onClick={deletePassword}>Delete Password</button>
  <button type="button"
  onClick={logOut}>Log Out</button>
  <input type="text"
  name="site"
  placeholder="Website"
  value={site}
  onChange={(e) => setSite(e.target.value)} />
  <input type="text"
  name="username" 
  placeholder="Username"
  value={username}
  onChange={(e) => setUsername(e.target.value)} />
  <input type="text"
  name="username"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)} />
  {message && (
          <div>
            {message}
          </div>
        )}
</>

  );
}