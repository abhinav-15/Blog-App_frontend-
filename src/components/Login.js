import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';  // Import the CSS file

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Declare setError with useState
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    try {
      const response = await axios.post('http://localhost:5001/api/auth/login', { username, password });
      setToken(response.data.token); // Store token in state or localStorage
      navigate('/'); // Redirect to home page or another page
    } catch (error) {
      console.error('Failed to login', error);
      setError('Invalid username or password'); // Set error message
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="login-input"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="login-input"
            required
          />
          {error && <p className="login-error">{error}</p>}  {/* Display error message */}
          <button type="submit" className="login-button">Login</button>
        </form>
        <p>Don't have an account? <Link to="/signup">Sign up here</Link></p> {/* Link to Signup */}
      </div>
    </div>
  );
};

export default Login;
