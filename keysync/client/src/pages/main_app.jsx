import { useState } from 'react';
import LoginPage from './loginpage.jsx';
import Dashboard from './dashboard.jsx';

function MainApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    isLoggedIn ? (
      <Dashboard onLoginSuccess={handleLoginSuccess}/>
    ) : (
      <LoginPage onLoginSuccess={handleLoginSuccess} />
    )
  );
}

export default MainApp;