import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';  // Import the CSS file

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Declare setError with useState
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    try {
      await axios.post('https://blog-app-iota-silk.vercel.app/api/auth/register', { username, password });
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      console.error('Failed to register', error);
      setError('Failed to register. Please try again.'); // Set error message
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Signup</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="signup-input"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="signup-input"
            required
          />
          {error && <p className="signup-error">{error}</p>}  {/* Display error message */}
          <button type="submit" className="signup-button">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
