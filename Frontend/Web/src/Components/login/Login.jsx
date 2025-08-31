import React, { useState } from 'react';
import {
    TextField,
    Button,
    Typography,
    Alert,
    Divider,
    IconButton,
    InputAdornment,
    Box,
    Paper,
    Container
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff, Email, Lock, Recycling, ArrowForward, CheckCircle } from '@mui/icons-material';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setError('The backend has been removed. Please use the development login buttons below.');
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleDevLogin = (role) => {
        console.log('Login attempt for role:', role);
        
        // Create a fake user session to satisfy the protected route
        const fakeUserData = {
            token: 'fake-dev-token',
            role: role,
            name: role === 'admin' ? 'Admin' : 'Customer',
            email: role === 'admin' ? 'admin@ecolift.com' : 'customer@ecolift.com',
            firstName: role === 'admin' ? 'Admin' : 'Customer',
            lastName: 'User'
        };
        
        // Store user info in localStorage
        localStorage.setItem('userInfo', JSON.stringify(fakeUserData));
        console.log('User info stored:', fakeUserData);
        
        // Navigate to the correct dashboard
        if (role === 'admin') {
            console.log('Navigating to admin dashboard...');
            navigate('/admin-dashboard', { replace: true });
        } else {
            console.log('Navigating to customer dashboard...');
            navigate('/dashboard', { replace: true });
        }
    };

    return (
        <div className="login-page">
            <div className="background-animation">
                <div className="floating-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                    <div className="shape shape-4"></div>
                </div>
            </div>
            
            <Container maxWidth="lg" className="login-container-wrapper">
                <div className="login-container">
                    {/* Left Side - Branding */}
                    <div className="login-branding">
                        <div className="branding-overlay"></div>
                        <div className="branding-content">
                            <div className="logo-section">
                                <div className="logo-container">
                                    <Recycling className="logo-icon" />
                                </div>
                                <Typography variant="h2" className="brand-title">
                                    Eco LIFT
                                </Typography>
                            </div>
                            
                            <Typography variant="h3" className="welcome-title">
                                Welcome Back
                            </Typography>
                            
                            <Typography variant="body1" className="welcome-subtitle">
                                Continue your journey towards a sustainable future. 
                                Together, we can make a difference.
                            </Typography>
                            
                            <div className="features-list">
                                <div className="feature-item">
                                    <div className="feature-icon">
                                        <CheckCircle />
                                    </div>
                                    <div className="feature-content">
                                        <span className="feature-title">Smart Waste Management</span>
                                        <span className="feature-desc">AI-powered collection optimization</span>
                                    </div>
                                </div>
                                <div className="feature-item">
                                    <div className="feature-icon">
                                        <CheckCircle />
                                    </div>
                                    <div className="feature-content">
                                        <span className="feature-title">Eco-Friendly Solutions</span>
                                        <span className="feature-desc">Sustainable waste processing</span>
                                    </div>
                                </div>
                                <div className="feature-item">
                                    <div className="feature-icon">
                                        <CheckCircle />
                                    </div>
                                    <div className="feature-content">
                                        <span className="feature-title">Easy Mobile Access</span>
                                        <span className="feature-desc">Seamless app experience</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Login Form */}
                    <div className="login-form-section">
                        <Paper elevation={0} className="form-paper">
                            <div className="form-container">
                                <div className="form-header">
                                    <Typography variant="h4" className="form-title">
                                        Sign In
                                    </Typography>
                                    <Typography variant="body2" className="form-subtitle">
                                        Enter your credentials to access your account
                                    </Typography>
                                </div>

                                {error && (
                                    <Alert severity="warning" className="error-alert">
                                        {error}
                                    </Alert>
                                )}

                                <form onSubmit={handleFormSubmit} className="login-form">
                                    <div className="input-group">
                                        <TextField
                                            fullWidth
                                            label="Email Address"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            disabled
                                            className="form-field"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Email className="field-icon" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </div>
                                    
                                    <div className="input-group">
                                        <TextField
                                            fullWidth
                                            label="Password"
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            disabled
                                            className="form-field"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Lock className="field-icon" />
                                                    </InputAdornment>
                                                ),
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            edge="end"
                                                            disabled
                                                            className="visibility-toggle"
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        className="signin-button"
                                        disabled
                                        endIcon={<ArrowForward />}
                                    >
                                        Sign In
                                    </Button>

                                    <Divider className="divider">
                                        <Typography variant="body2" className="divider-text">
                                            Development Access
                                        </Typography>
                                    </Divider>

                                    <div className="dev-buttons">
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            onClick={() => handleDevLogin('admin')}
                                            className="dev-button admin-button"
                                            endIcon={<ArrowForward />}
                                        >
                                            Admin Login
                                        </Button>
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            onClick={() => handleDevLogin('customer')}
                                            className="dev-button customer-button"
                                            endIcon={<ArrowForward />}
                                        >
                                            Customer Login
                                        </Button>
                                    </div>

                                    <div className="signup-link">
                                        <Typography variant="body2">
                                            Don't have an account?{' '}
                                            <Button
                                                variant="text"
                                                onClick={() => navigate('/register')}
                                                className="link-button"
                                            >
                                                Sign Up
                                            </Button>
                                        </Typography>
                                    </div>
                                </form>
                            </div>
                        </Paper>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Login;