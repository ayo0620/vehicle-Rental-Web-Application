import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../Styles/LoginPage/AdminSignupPage.css';

interface AdminSignupPageProps {
  onAdminSignup: (email: string, password: string) => void;
}

const AdminSignupPage: React.FC<AdminSignupPageProps> = ({ onAdminSignup }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const role = "admin"
  const navigate = useNavigate();

  const handleAdminSignup = async () => {
    try {
      // Basic validation
      if (!email || !password) {
        alert('Please enter both email and password.');
        return;
      }

      // Call your backend signup endpoint
      const response = await fetch('http://localhost:5001/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();
      if (response.ok) {
        // Signup successful
        onAdminSignup(email, password);
        localStorage.setItem('token', data.token); // Save the token to local storage
        navigate('/');
      } else {
        // Signup failed
        alert(data.message);
      }
    } catch (error: any) {
      console.error('An error occurred:', error.message);
    }
  };

  return (
    <div className='admin-signup-container'>
      <div className='admin-signup-form'>
        <h2>Admin Sign Up</h2>
        <form>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="button" onClick={handleAdminSignup}>
            Sign Up As Admin
          </button>
        </form>
        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default AdminSignupPage;
