import React, { useState } from 'react';
import Signup from './Signup';
import Login from './Login';

function Home() {
  const [showForm, setShowForm] = useState('');

  const handleButtonClick = (formType) => {
    setShowForm(formType);
  };

  return (
    <div className="home-container">
      <div className="nav-bar">
        <button onClick={() => handleButtonClick('signup')}>Sign Up</button>
        <button onClick={() => handleButtonClick('login')}>Login</button>
      </div>

      <div className="form-container">
        {showForm === 'signup' && <Signup />}
        {showForm === 'login' && <Login />}
      </div>
    </div>
  );
}

export default Home;
