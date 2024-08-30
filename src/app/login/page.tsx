"use client";

import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      // Sauvegarde du token et redirection
      localStorage.setItem('token', data.token);
      window.location.href = '/profile'; // Remplacement de router.push par window.location.href
    } else {
      setError(data.message || 'Login failed');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          className='text-black'
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className='text-black'
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'black' }}>{error}</p>}
    </div>
  );
};

export default Login;
