import { useState } from 'react';
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
    // Redirect to main page
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
    if (password != confirmPassword)
    {
      setMessage('Passwords do not match');
      setMessageType('error');
      return;
    }

    try
    {
      const response = await fetch('http://localhost:8080/login/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      const data = await response;

      if (response.status == 200) {
        window.location.href = '/main';
        setMessage(data.message || 'Login successful!');
        setMessageType('success');
        
        
        if (data.token) {
          console.log('Auth token received:', data.token);
        }
      }

      else if (response.status == 409)  {
        setMessage('Account with that username already exists');
        setMessageType('error');
      }
    }
    catch (error)
    { 
      setMessage('Cannot connect to server. Please try again.');
      setMessageType('error');
      console.error('Account creation error:', error);
    }
    finally
    {
      setLoading(false);

    }

  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCreateAcc();
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      padding: '40px',
      width: '100%',
      maxWidth: '400px'
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px'
    },
    icon: {
      width: '60px',
      height: '60px',
      margin: '0 auto 20px',
      backgroundColor: '#667eea',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '30px'
    },
    title: {
      margin: '0',
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#333'
    },
    inputGroup: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontSize: '14px',
      fontWeight: '600',
      color: '#555'
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      fontSize: '16px',
      border: '2px solid #ddd',
      borderRadius: '8px',
      outline: 'none',
      transition: 'border-color 0.3s',
      boxSizing: 'border-box',
      fontFamily: 'inherit'
    },
    inputFocus: {
      borderColor: '#667eea'
    },
    button: {
      width: '100%',
      padding: '14px',
      fontSize: '16px',
      fontWeight: 'bold',
      color: 'white',
      backgroundColor: '#667eea',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      marginTop: '10px'
    },
    buttonHover: {
      backgroundColor: '#5568d3'
    },
    buttonDisabled: {
      backgroundColor: '#ccc',
      cursor: 'not-allowed'
    },
    alert: {
      padding: '12px 16px',
      borderRadius: '8px',
      marginTop: '16px',
      fontSize: '14px',
      fontWeight: '500'
    },
    alertSuccess: {
      backgroundColor: '#d4edda',
      color: '#155724',
      border: '1px solid #c3e6cb'
    },
    alertError: {
      backgroundColor: '#f8d7da',
      color: '#721c24',
      border: '1px solid #f5c6cb'
    },
    infoBox: {
      marginTop: '24px',
      padding: '16px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      fontSize: '13px',
      color: '#666'
    },
    infoTitle: {
      fontWeight: 'bold',
      marginBottom: '8px',
      display: 'block'
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

        {message && (
          <div style={{
            ...styles.alert,
            ...(messageType === 'success' ? styles.alertSuccess : styles.alertError)
          }}>
            {message}
          </div>
        )}
        <button className="createacc-btn" onClick={handleCreateAcc}>Create Account</button>

        </div>

      </div>

      
    </div>
  );
}