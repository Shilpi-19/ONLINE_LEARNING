import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';

const Signup = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    role: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setError('');
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!userData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!userData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!userData.password.trim()) {
      setError('Password is required');
      return false;
    }
    if (userData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (!userData.role.trim()) {
      setError('Role is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      console.log('Attempting signup with:', { ...userData, password: '[HIDDEN]' });
      const response = await authService.signup(userData);
      console.log('Signup response:', response);
      
      if (response.token) {
        localStorage.setItem('user', JSON.stringify(response.user));
        navigate('/courses');
      } else {
        setError('No token recieved from server.');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Create Account</h2>
      {error && <div style={styles.error}>{error}</div>}
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="name" style={styles.label}>Full Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            style={styles.input}
            disabled={isLoading}
            placeholder="Enter your full name"
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="email" style={styles.label}>Email Address</label>
          <input
            id="email"
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            style={styles.input}
            disabled={isLoading}
            placeholder="Enter your email"
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            style={styles.input}
            disabled={isLoading}
            placeholder="Create a password"
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="role" style={styles.label}>Role</label>
          <select
            id="role"
            name="role"
            value={userData.role}
            onChange={handleChange}
            style={styles.input}
            disabled={isLoading}
          >
            <option value="">Select your role</option>
            <option value="admin">Admin</option>
            <option value="instructor">Instructor</option>
            <option value="student">Student</option>
          </select>
        </div>

        <button 
          type="submit" 
          style={isLoading ? { ...styles.button, ...styles.buttonDisabled } : styles.button}
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '450px',
    margin: '40px auto',
    padding: '30px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#333',
    fontSize: '24px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#555',
  },
  input: {
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '16px',
    transition: 'border-color 0.3s ease',
    '&:focus': {
      borderColor: '#4a90e2',
      outline: 'none',
    },
  },
  button: {
    padding: '14px',
    backgroundColor: '#4a90e2',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '10px',
    '&:hover': {
      backgroundColor: '#357abd',
    },
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
    cursor: 'not-allowed',
  },
  error: {
    color: '#dc3545',
    backgroundColor: '#f8d7da',
    padding: '12px',
    borderRadius: '6px',
    marginBottom: '20px',
    textAlign: 'center',
    fontSize: '14px',
  }
};

export default Signup;