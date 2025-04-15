// File: src/components/Login.tsx
import React, { useState } from 'react';
import '../styles/LoginStyles.css';

interface LoginProps {
  onLogin?: (username: string, password: string) => void;
}

function Login({ onLogin }: LoginProps) {
  const [message, setMessage] = useState('');
  const [loginName, setLoginName] = useState('');
  const [loginPassword, setPassword] = useState('');

  async function doLogin(event: any): Promise<void> {
    event.preventDefault();

    if (!loginName || !loginPassword) {
      setMessage('Please enter both username and password.');
      return;
    }

    if (onLogin) {
      onLogin(loginName, loginPassword);
      return;
    }

    const obj = { login: loginName, password: loginPassword };
    const js = JSON.stringify(obj);

    // https://largeproj.alexcanapp.xyz/api/users/login
    //change localhost to largeproj when put on the lightsail server
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        body: js,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const res = JSON.parse(await response.text());

      if (res.id <= 0) {
        setMessage('User/Password combination incorrect');
      } else {
        const user = {
          firstName: res.firstName,
          lastName: res.lastName,
          id: res.id,
        };
        localStorage.setItem('user_data', JSON.stringify(user));
        setMessage('');
        window.location.href = '/home';
      }
    } catch (error: any) {
      alert(error.toString());
      return;
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-left">
          <div className="login-form">
            <h1 className="login-title">
            Online<br />
            Text-Editor
            </h1>
          <p className="login-subtitle">Login to your account!</p>
         
            <input
              type="text"
              id="loginName"
              placeholder="Username"
              value={loginName}
              onChange={(e) => setLoginName(e.target.value)}
              className="login-input"
            />
            <input
              type="password"
              id="loginPassword"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
            <button onClick={doLogin} className="login-button">
              Log In
            </button>
            <span className="login-message">{message}</span>
          </div>
        </div>
        <div className="login-right">
        <h2 className="new-here-heading">New Here?</h2>
          <p>Sign up and discover a great amount of new opportunities!</p>
          <a href="/register" className="signup-button">Sign Up</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
