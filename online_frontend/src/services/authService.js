const API_URL = '/api/auth';

const signup = async (userData) => {
  try {
    // Add default role to userData
    const userDataWithRole = {
      ...userData,
      role: 'student' // Default role for new users
    };

    console.log("Sending request to:", `${API_URL}/signup`);
    console.log("Request body:", JSON.stringify(userDataWithRole));

    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(userDataWithRole)
    });

    console.log("Raw Response:", response);
    

    const data = await response.json();
    console.log("Response Data:", data);

    if (!response.ok) {
      throw new Error(data.message || data.error || 'Registration failed');
    }

    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

const login = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem('token');
};

export const authService = {
  signup,
  login,
  logout
};