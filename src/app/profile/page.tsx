"use client"

import { useEffect, useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState<{ email: string, uuid: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      // Redirection vers la page de connexion
      window.location.href = 'https://auth-test-lac-gamma.vercel.app//login';
      return;
    }

    // Fonction asynchrone pour vérifier le token
    const verifyToken = async () => {
      try {
        const res = await fetch('https://auth-test-lac-gamma.vercel.app//api/verify-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          if (data.error) {
            localStorage.removeItem('token');
            window.location.href = 'https://auth-test-lac-gamma.vercel.app//login';
          } else {
            setUser(data.user);
          }
        } else {
          // Gérer les erreurs de réponse non ok
          localStorage.removeItem('token');
          window.location.href = 'https://auth-test-lac-gamma.vercel.app//login';
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        localStorage.removeItem('token');
        window.location.href = 'https://auth-test-lac-gamma.vercel.app//login';
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!user) return <div>Redirecting to login...</div>;

  return (
    <div>
      <h1>Welcome, {user.email}</h1>
      <h1>Welcome, {user.uuid}</h1>
    </div>
  );
};

export default Profile;
