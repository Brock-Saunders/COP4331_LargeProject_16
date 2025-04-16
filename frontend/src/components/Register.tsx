import React, { useState } from 'react';
import '../styles/RegisterStyles.css';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    if (!firstname || !lastname || !email || !username || !password || !confirmPassword) {
      setMessage('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    const obj = { firstName: firstname, lastName: lastname, email: email, login: username, password: password };
    const js = JSON.stringify(obj);

    const url = 'https://largeproj.alexcanapp.xyz/api/users/register'; // Change to domain

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: js,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const res = JSON.parse(await response.text());
      console.log('Register API response:', res);
      if (res.error) {
        setMessage(res.error);
        return;
      }

    } catch (error) {
      console.error('Error during registration:', error);
      setMessage('An error occurred. Please try again later.');
      return;
    }

    setMessage('Registered successfully!');
    setLoading(true);

    setTimeout(() => {
      navigate('/');
    }, 1500); // 1.5 second redirect
  }

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <div className="register-left">
          <div className="register-form">
            <h1 className="register-title">Register here!</h1>
            <p className="register-subtitle">Create an account to get started!</p>

            <input
              type="text"
              placeholder="First Name"
              className="register-input"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              disabled={loading}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="register-input"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              disabled={loading}
            />
            <input
              type="email"
              placeholder="Email"
              className="register-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <input
              type="text"
              placeholder="Username"
              className="register-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
            <input
              type="password"
              placeholder="Password"
              className="register-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="register-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
            />

            <button className="register-button" onClick={handleRegister} disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>

            {(message || loading) && (
              <div className="register-message-with-spinner">
                {loading && <div className="spinner" />}
                <span className="register-message-text">{message}</span>
              </div>
            )}
          </div>
        </div>

        <div className="register-right">
          <h2 className="register-heading">Already Registered?</h2>
          <p>Go back to login and access your notes!</p>
          <a href="/" className="login-back-button">
            Login
          </a>
        </div>
      </div>
    </div>
  );
}

export default Register;