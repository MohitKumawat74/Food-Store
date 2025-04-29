import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const Success = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [message, setMessage] = useState('Verifying your payment...');
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    if (sessionId) {
      fetch(`http://localhost:5000/api/verify-checkout-session?session_id=${sessionId}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setMessage('🎉 Payment successful! Thank you for your purchase.');
          } else {
            setMessage('⚠️ Payment could not be verified.');
          }
          setFadeIn(true);
        })
        .catch(() => {
          setMessage('⚠️ Something went wrong while verifying payment.');
          setFadeIn(true);
        });
    }
  }, [sessionId]);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
      }}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '12px',
          padding: '3rem',
          textAlign: 'center',
          maxWidth: '500px',
          width: '100%',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
          opacity: fadeIn ? 1 : 0,
          transform: fadeIn ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease',
        }}
      >
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#333' }}>{message}</h2>
        <Link to='/'>
          <button
            style={{
              marginTop: '1.5rem',
              padding: '0.75rem 2rem',
              fontSize: '1.1rem',
              backgroundColor: '#667eea',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#5a67d8')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#667eea')}
          >
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
