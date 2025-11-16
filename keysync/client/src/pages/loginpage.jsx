import { useState } from 'react';
import '../styles/loginpage.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      setMessage('Please fill in all fields');
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:8080/login', {
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
        window.location.href = '/main'
        setMessage(data.message || 'Login successful!');
        setMessageType('success');
        
        if (data.token) {
          console.log('Auth token received:', data.token);
        }
      }
      else if (response.status == 400)  {
        setMessage(data.message || 'Incorrect password');
        setMessageType('error');
      }
      else if (response.status == 404)  {
        setMessage(data.message || 'Account does not exist');
        setMessageType('error');
      }
      else {
        setMessage(data.message || 'Login failed');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Cannot connect to server. Please try again.');
      setMessageType('error');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
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

  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);

 return (
  <div className="lp-container">
    <div className="lp-card">
      <div style={styles.header}>
          <div style={styles.icon}>🔐</div>
          <h1 style={styles.title}>Welcome to KeySync!</h1>
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Username</label>
          <input
            type="text"
            style={{
              ...styles.input,
              ...(usernameFocused ? styles.inputFocus : {})
            }}
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => setUsernameFocused(true)}
            onBlur={() => setUsernameFocused(false)}
            disabled={loading}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            style={{
              ...styles.input,
              ...(passwordFocused ? styles.inputFocus : {})
            }}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            disabled={loading}
          />
        </div>

        {message && (
          <div style={{
            ...styles.alert,
            ...(messageType === 'success' ? styles.alertSuccess : styles.alertError)
          }}>
            {message}
          </div>
        )}

        <button
          style={{
            ...styles.button,
            ...(loading ? styles.buttonDisabled : {}),
            ...(buttonHovered && !loading ? styles.buttonHover : {})
          }}
          onClick={handleLogin}
          onMouseEnter={() => setButtonHovered(true)}
          onMouseLeave={() => setButtonHovered(false)}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div style={styles.infoBox}>
          <span style={styles.infoTitle}>📝 How this works:</span>
          • Frontend collects username & password<br/>
          • Sends POST request to backend API<br/>
          • Backend validates & checks database<br/>
          • Backend sends success/error response<br/>
          • Frontend displays the result
        </div>
      </div>
    </div>
  );
}