import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
  });
  const [showForm, setShowForm] = useState('signup'); // 'signup', 'login', or 'success'
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/auth/signup', formData);
      setSuccessMessage('Signup successful!');
      setShowForm('success');
    } catch (error) {
      console.error(error.response.data);
      setSuccessMessage('Signup failed. Please try again.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/auth/login', formData);
      setSuccessMessage('Login successful!');
      setShowForm('success');
    } catch (error) {
      console.error(error.response.data);
      setSuccessMessage('Login failed. Please try again.');
    }
  };

  return (
    <div className="form-container">
      {showForm === 'signup' && (
        <>
          <h2>Sign Up</h2>
          <form onSubmit={handleSignup}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Email Id:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Gender:</label>
              <div>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={handleChange}
                    required
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={handleChange}
                    required
                  />
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    checked={formData.gender === 'other'}
                    onChange={handleChange}
                    required
                  />
                  Other
                </label>
              </div>
            </div>

            <button type="submit">Sign Up</button>
            <button type="button" onClick={() => setShowForm('login')}>Login</button>
          </form>
        </>
      )}

      {showForm === 'login' && (
        <>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label>Email Id:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit">Login</button>
            <button type="button" onClick={() => setShowForm('signup')}>Go Back</button>
          </form>
        </>
      )}

      {showForm === 'success' && (
        <div className="success-dialog">
          <p>{successMessage}</p>
          <button onClick={() => setShowForm('signup')}>Go to Signup</button>
          <button onClick={() => setShowForm('login')}>Go to Login</button>
        </div>
      )}
    </div>
  );
}

export default Signup;
