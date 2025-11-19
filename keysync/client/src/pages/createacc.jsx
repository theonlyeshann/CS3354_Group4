import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../styles/createacc.css';

export default function Dashboard() {
  const [passwords, setPasswords] = useState([
  ]);

  const retrievePasswordsFromDatabase = async() =>  {
    try {      
      setPasswords([...[]]);
      const response = await fetch('http://localhost:8080/main/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });
      
      if (response.status == 200) {
        let existingPasswords = await response.json();
        console.log(`Existing passwords - ${existingPasswords}`);
        const formattedExistingPasswords = existingPasswords.map((password) =>  ({
          id: uuidv4(),
          websiteName: password.Site,
          username: password.Username,
          password: password.Password,
          lastChanged: new Date().toLocaleDateString('en-US'),
          status: 'Secure'
        }));
        setPasswords([...formattedExistingPasswords]);
      }

    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    retrievePasswordsFromDatabase();
  }, []);

  useEffect(() => {
    console.log(passwords);
  }, [passwords]);

  const handleSignIn = () => {
    // Redirect to login page
    window.location.href = '/';
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
        <input type="text" placeholder="Username" className="username-input" />
        <input type="text" placeholder="Password" className="pw-input" />
        <input type="text" placeholder="Confirm Password" className="pw-input" />
        <button className="createacc-btn" onClick={handleSignIn}>Create Account</button>
        </div>

      </div>

      
    </div>
  );
}