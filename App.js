import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import UserTable from './components/UserTable';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAdminLogin = () => {
    setIsAdmin(true);
    setIsLoggedIn(true);
  };

  const handleUserLogin = () => {
    setIsLoggedIn(true);
    setIsAdmin(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <Router>
      <div className="app-container">
        <header>
          {!isLoggedIn && (
            <>
              <button onClick={() => window.location.href = '/signup'}>Sign Up</button>
              <button onClick={() => window.location.href = '/login'}>Login</button>
            </>
          )}
          {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
        </header>

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to={isLoggedIn ? (isAdmin ? "/admin/dashboard" : "/profile") : "/login"} />} />
          <Route path="/signup" element={<Signup />} />

          {/* User Routes */}
          <Route path="/login" element={<Login onLogin={handleUserLogin} />} />
          <Route path="/profile" element={isLoggedIn && !isAdmin ? <Profile /> : <Navigate to="/login" />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin onLogin={handleAdminLogin} />} />
          <Route path="/admin/dashboard" element={isLoggedIn && isAdmin ? <UserTable /> : <Navigate to="/admin/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
