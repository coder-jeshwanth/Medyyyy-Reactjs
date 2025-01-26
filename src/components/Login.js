import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import './Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await authService.login(username, password);
            if (response.role === 'STAFF') {
                navigate('/staff-dashboard');
            } else if (response.role === 'ADMIN') {
                navigate('/admin-dashboard');
            } else {
                alert(response.message);
            }
        } catch (error) {
            alert('Login failed');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Sign In</h2>
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="login-input"
                    />
                </div>
                <div className="input-group">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="login-input"
                    />
                </div>
                <button
                    onClick={handleLogin}
                    className="login-button"
                >
                    Sign In
                </button>
            </div>
        </div>
    );
}

export default Login;
