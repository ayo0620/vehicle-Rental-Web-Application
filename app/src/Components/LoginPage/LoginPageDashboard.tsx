import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../Styles/LoginPage/LoginPageDashboard.css'

interface LoginPageProps {
  onLogin: (email: string, password: string) => void;
}

const LoginPageDashboard: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Basic validation
      if (!email || !password) {
        alert('Please enter both email and password.');
        return;
      }

      // Call your backend authentication endpoint
      const response = await fetch('http://localhost:5001/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful
        onLogin(email, password);
        localStorage.setItem('token', data.token); // Save the token to local storage
        const token = data.token;
        console.log('Admin Token:', token);
        const userRole = data.role;

        if (userRole == 'admin') {
          navigate('/adminDashboard');
        }
        else {
          navigate('/vehicleListings');
        }
      } else {
        // Login failed
        alert(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error: any) {
      console.error('An error occurred:', error.message);
    }
  };

  return (
    <div className='parent-container'>
      <div className='login-container'>
        <h2>Welcome</h2>
        <form>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
        <button type="button" onClick={() => navigate('/adminSignup')}>
            Sign Up As Admin
        </button>
      </div>
    </div>
  );
};

export default LoginPageDashboard;
