import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../styles/createacc.css';

export default function Dashboard() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isError] = useState(false);


  const handleSignIn = () => {
    // Redirect to login page
    window.location.href = '/login';
  };

  const handleCreateAcc = async () =>
  {
    setLoading(true);
    setMessage('');
    
    //  If any field is empty
    if (!username || !password || !confirmPassword)
    {
      setMessage('Please fill in all fields');
      setMessageType('error');
      return;
    }
    //  If Password != Confirm Password
    else if (password != confirmPassword)
    {
      setMessage('Passwords do not match');
      setMessageType('error');
      return;
    }

    try
    {
      //  User account creation code here
    }
    catch (error)
    { 
      setMessage('Cannot connect to server. Please try again.');
      setMessageType('error');
      console.error('Login error:', error);
    }
    finally
    {
      setLoading(false);
      window.location.href = '/login';
    }

  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCreateAcc();
    }
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <button className="signin-btn" onClick={handleSignIn}>Sign In</button>
        </div>
        
        <div className="header-center">
          <h1 className="app-title">KeySync</h1>
        </div>
        
        <div className="header-right">
          <div className="user-icon">🔐</div>
        </div>
      </header>

      {/* Main Content */}
      <div className="dashboard-content">
        
        {/* Create Account */}
        <div className="createacc-section">
        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Username"
          className="username-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyPress={handleKeyPress}
        />

        <input 
          type="password"
          placeholder="Password"
          className="pw-input" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
        />

        <input 
          type="password"
          placeholder="Confirm Password"
          className="pw-input" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onKeyPress={handleKeyPress}
        />

        <div className='msg-content'>
          {message}
        </div>
        <button className="createacc-btn" onClick={handleCreateAcc}>Create Account</button>

        </div>

      </div>

      
    </div>
  );
}