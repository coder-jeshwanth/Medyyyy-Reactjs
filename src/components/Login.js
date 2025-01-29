import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import authService from '../services/authService';
import './Login.css';
import { HoverContext } from './HoverContext';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { isAddIconHovered, setIsAddIconHovered } = useContext(HoverContext);

    const handleLogin = async () => {
        try {
            const response = await authService.login(username, password);
            if (response.role === 'STAFF' || response.role === 'ADMIN') {
                onLogin(true);
                navigate('/vikashome');
            } else {
                alert(response.message || 'Invalid login credentials');
            }
        } catch (error) {
            alert('Login failed. Please try again.');
        }
    };

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
        setIsAddIconHovered(e.target.value.length > 0);
    };

    const logoSrc = isAddIconHovered ? '/logohover.png' : '/logo.png';

    return (
        <div
            style={{
                backgroundImage: `url('/back.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '100vh',
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontFamily: `'Arial, sans-serif'`,
            }}
        >
            <div className="login-card">
                <img src={logoSrc} alt="Logo" className="logo" />
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="USERNAME"
                        value={username}
                        onChange={handleInputChange(setUsername)}
                        className="login-input"
                    />
                </div>
                <div className="input-group password-group">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="PASSWORD"
                        value={password}
                        onChange={handleInputChange(setPassword)}
                        className="login-input"
                    />
                    <span
                        className={`eye-icon ${showPassword ? 'show' : ''}`}
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        <FaEye />
                    </span>
                </div>
                <button
                    onClick={handleLogin}
                    className="login-button"
                >
                    Login
                </button>
            </div>
        </div>
    );
}

export default Login;