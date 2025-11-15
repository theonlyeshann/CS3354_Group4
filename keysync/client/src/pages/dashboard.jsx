import { useState } from 'react';
import '../styles/dashboard.css';

export default function Dashboard() {
  const [passwords, setPasswords] = useState([
    {
      id: 1,
      websiteName: 'Website Name',
      password: '******************',
      lastChanged: 'MM/DD/YYYY',
      status: 'Secure'
    },
    {
      id: 2,
      websiteName: 'Website Name',
      password: '******************',
      lastChanged: 'MM/DD/YYYY',
      status: 'Breach Detected'
    },
    {
      id: 3,
      websiteName: 'Website Name',
      password: '******************',
      lastChanged: 'MM/DD/YYYY',
      status: 'Secure'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedPassword, setSelectedPassword] = useState(null);
  
  const [newPassword, setNewPassword] = useState({
    websiteUrl: '',
    username: '',
    password: ''
  });

  const [editPassword, setEditPassword] = useState({
    websiteUrl: '',
    username: '',
    password: ''
  });

  const handleLogout = () => {
    // Redirect to login page
    window.location.href = '/';
  };

  const handleAddPassword = () => {
    if (newPassword.websiteUrl && newPassword.username && newPassword.password) {
      const newEntry = {
        id: Date.now(),
        websiteName: newPassword.websiteUrl,
        password: '*'.repeat(newPassword.password.length),
        lastChanged: new Date().toLocaleDateString('en-US'),
        status: 'Secure'
      };
      setPasswords([...passwords, newEntry]);
      setNewPassword({ websiteUrl: '', username: '', password: '' });
      setShowAddModal(false);
    }
  };

  const handleDeletePassword = (id) => {
    setSelectedPassword(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setPasswords(passwords.filter(p => p.id !== selectedPassword));
    setShowDeleteModal(false);
    setSelectedPassword(null);
  };

  const handleEditPassword = (password) => {
    setSelectedPassword(password.id);
    setEditPassword({
      websiteUrl: password.websiteName,
      username: '',
      password: ''
    });
    setShowEditModal(true);
  };

  const saveEditPassword = () => {
    setPasswords(passwords.map(p => {
      if (p.id === selectedPassword) {
        return {
          ...p,
          websiteName: editPassword.websiteUrl || p.websiteName,
          password: editPassword.password ? '*'.repeat(editPassword.password.length) : p.password,
          lastChanged: new Date().toLocaleDateString('en-US')
        };
      }
      return p;
    }));
    setShowEditModal(false);
    setEditPassword({ websiteUrl: '', username: '', password: '' });
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
          <button className="icon-btn" onClick={() => setShowNotifications(!showNotifications)}>
            🔔
          </button>
          <button className="icon-btn">⚙️</button>
        </div>
        
        <div className="header-center">
          <h1 className="app-title">KeySync</h1>
        </div>
        
        <div className="header-right">
          <div className="user-icon">🔐</div>
        </div>

        {/* Notifications Dropdown */}
        {showNotifications && (
          <div className="notifications-dropdown">
            <p>No new notifications!</p>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Left Section - Passwords */}
        <div className="passwords-section">
          <div className="section-header">
            <h2>Passwords</h2>
            <button className="add-btn" onClick={() => setShowAddModal(true)}>
              <span className="plus-icon">+</span>
            </button>
          </div>

          <div className="passwords-list">
            {passwords.map((password) => (
              <div key={password.id} className="password-card">
                <div className="password-info">
                  <h3 className="website-name">{password.websiteName}</h3>
                  <p className="password-text">Password: {password.password}</p>
                  <p className="last-changed">Last Changed: {password.lastChanged}</p>
                  <p className={`status ${password.status === 'Breach Detected' ? 'breach' : 'secure'}`}>
                    Status: {password.status}
                  </p>
                </div>
                <div className="password-actions">
                  <button className="delete-btn" onClick={() => handleDeletePassword(password.id)}>
                    🗑️ DELETE
                  </button>
                  <button className="edit-btn" onClick={() => handleEditPassword(password)}>
                    ✏️ EDIT
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="right-section">
          {/* Have I Been Pwned Section */}
          <div className="pwned-section">
            <h2>HaveIBeenPwned?</h2>
            <input type="text" placeholder="Website Name" className="pwned-input" />
            <input type="text" placeholder="Website Name" className="pwned-input" />
          </div>

          {/* Notifications Section */}
          <div className="notifications-section">
            <h2>Notifications</h2>
          </div>
        </div>
      </div>

      {/* Add Password Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Add New Password</h2>
            <input
              type="text"
              placeholder="Website URL"
              value={newPassword.websiteUrl}
              onChange={(e) => setNewPassword({ ...newPassword, websiteUrl: e.target.value })}
              className="modal-input"
            />
            <input
              type="text"
              placeholder="Username"
              value={newPassword.username}
              onChange={(e) => setNewPassword({ ...newPassword, username: e.target.value })}
              className="modal-input"
            />
            <input
              type="password"
              placeholder="Password"
              value={newPassword.password}
              onChange={(e) => setNewPassword({ ...newPassword, password: e.target.value })}
              className="modal-input"
            />
            <div className="modal-actions">
              <button className="modal-btn cancel" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="modal-btn save" onClick={handleAddPassword}>Add Password</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Password Modal */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Edit Password</h2>
            <input
              type="text"
              placeholder="Website URL"
              value={editPassword.websiteUrl}
              onChange={(e) => setEditPassword({ ...editPassword, websiteUrl: e.target.value })}
              className="modal-input"
            />
            <input
              type="text"
              placeholder="Username"
              value={editPassword.username}
              onChange={(e) => setEditPassword({ ...editPassword, username: e.target.value })}
              className="modal-input"
            />
            <input
              type="password"
              placeholder="New Password"
              value={editPassword.password}
              onChange={(e) => setEditPassword({ ...editPassword, password: e.target.value })}
              className="modal-input"
            />
            <div className="modal-actions">
              <button className="modal-btn cancel" onClick={() => setShowEditModal(false)}>Cancel</button>
              <button className="modal-btn save" onClick={saveEditPassword}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal delete-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Delete Password</h2>
            <p>Are you sure you want to delete this password?</p>
            <div className="modal-actions">
              <button className="modal-btn cancel" onClick={() => setShowDeleteModal(false)}>No</button>
              <button className="modal-btn delete" onClick={confirmDelete}>Yes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}