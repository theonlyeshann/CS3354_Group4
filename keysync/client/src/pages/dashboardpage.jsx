import { useState } from 'react';

export default function DashboardPage() {
  const [passwords] = useState([
    {
      id: 1,
      site: 'Website Name',
      lastChanged: '08/15/2025',
      status: 'Secure'
    },
    {
      id: 2,
      site: 'Website Name 2',
      lastChanged: '07/22/2025',
      status: 'Breach Detected'
    }
  ]);

  const handleLogout = () => {
    console.log('Logging out...');
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'white',
      width: '100%',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      color: '#333'
    },
    topBar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      marginBottom: '30px'
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold'
    },
    logout: {
      backgroundColor: 'white',
      color: '#333',
      border: 'none',
      borderRadius: '8px',
      padding: '10px 20px',
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'background-color 0.3s'
    },
    logoutHover: {
      backgroundColor: '#667eea'
    },
    mainContent: {
      display: 'flex',
      gap: '30px'
    },
    leftPanel: {
      flex: 2,
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '30px',
      boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
    },
    rightPanel: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '20px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
    },
    cardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px'
    },
    addButton: {
      backgroundColor: '#667eea',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '36px',
      height: '36px',
      fontSize: '20px',
      cursor: 'pointer'
    },
    passwordCard: {
      backgroundColor: '#f8f9fa',
      borderRadius: '12px',
      padding: '16px',
      marginBottom: '16px',
      border: '1px solid #ddd'
    },
    breach: {
      backgroundColor: '#ffe5e5',
      border: '1px solid #f5c6cb'
    },
    smallTitle: {
      fontWeight: 'bold',
      fontSize: '18px',
      marginBottom: '6px'
    },
    smallText: {
      fontSize: '14px',
      color: '#555'
    }
  };

  const [logoutHover, setLogoutHover] = useState(false);

  return (
    <div style={styles.container}>
      {/* Top Bar */}
      <div style={styles.topBar}>
        
        <button
          style={{
            ...styles.logout,
            ...(logoutHover ? styles.logoutHover : {})
          }}
          onClick={handleLogout}
          onMouseEnter={() => setLogoutHover(true)}
          onMouseLeave={() => setLogoutHover(false)}
        >
          Logout
        </button>

        <div style={styles.title}>🔐 KeySync Dashboard</div>
        
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Passwords Section */}
        <div style={styles.leftPanel}>
          <div style={styles.cardHeader}>
            <h2 style={{ margin: 0 }}>Passwords</h2>
            <button style={styles.addButton}>+</button>
          </div>

          {passwords.map((p) => (
            <div
              key={p.id}
              style={{
                ...styles.passwordCard,
                ...(p.status === 'Breach Detected' ? styles.breach : {})
              }}
            >
              <div style={styles.smallTitle}>{p.site}</div>
              <div style={styles.smallText}>
                Password: **************<br />
                Last Changed: {p.lastChanged}<br />
                Status: {p.status}
              </div>
            </div>
          ))}
        </div>

        {/* Right Section */}
        <div style={styles.rightPanel}>
          <div style={styles.card}>
            <h3>HaveIBeenPwned?</h3>
            <p style={styles.smallText}>
              Breach detected.
            </p>
          </div>
          <div style={styles.card}>
            <h3>Notifications</h3>
            <p style={styles.smallText}>
              No new alerts at the moment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
