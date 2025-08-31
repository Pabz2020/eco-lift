import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Paper,
    Grid,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Alert,
    CircularProgress,
    Box,
    Card,
    CardContent,
    Avatar,
    Chip,
    AppBar,
    Toolbar,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Badge,
    LinearProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Menu,
    MenuItem,
    Tooltip,
    Fab
} from '@mui/material';
import {
    Delete as DeleteIcon,
    Edit as EditIcon,
    Add as AddIcon,
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    Settings as SettingsIcon,
    Logout as LogoutIcon,
    Search as SearchIcon,
    FilterList as FilterIcon,
    Refresh as RefreshIcon,
    TrendingUp as TrendingUpIcon,
    Notifications as NotificationsIcon,
    AccountCircle as AccountCircleIcon,
    Visibility as VisibilityIcon,
    MoreVert as MoreVertIcon,
    CheckCircle as CheckCircleIcon,
    Warning as WarningIcon,
    Error as ErrorIcon,
    Info as InfoIcon,
    Person as PersonIcon,
    LocalShipping as LocalShippingIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [userStats, setUserStats] = useState({
        totalUsers: 0,
        totalCustomers: 0,
        totalCollectors: 0,
        newCustomers: 0,
        newCollectors: 0
    });
    const [recentCustomers, setRecentCustomers] = useState([]);
    const [recentCollectors, setRecentCollectors] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('all');
    const [selectedUser, setSelectedUser] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    
    // Get token from userInfo instead of separate token storage
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo?.token;

    const userChartData = [
        { name: 'Day 1', users: 4 },
        { name: 'Day 2', users: 3 },
        { name: 'Day 3', users: 5 },
        { name: 'Day 4', users: 4 },
        { name: 'Day 5', users: 6 },
        { name: 'Day 6', users: 8 },
        { name: 'Day 7', users: 12 },
    ];

    useEffect(() => {
        console.log('AdminDashboard mounted');
        console.log('Current token:', token);
        if (!token) {
            console.log('No token found, redirecting to login');
            navigate('/login');
            return;
        }
        console.log('Fetching data...');
        fetchDashboardData();
    }, [token, navigate]);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            
            // Fetch user statistics
            const statsResponse = await axios.get('http://localhost:4000/api/users/users/stats', {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            if (statsResponse.data) {
                setUserStats(statsResponse.data.stats);
                setRecentCustomers(statsResponse.data.recentCustomers || []);
                setRecentCollectors(statsResponse.data.recentCollectors || []);
            }

            // Fetch all users for the table
            const usersResponse = await axios.get('http://localhost:4000/api/users/users', {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            if (usersResponse.data) {
                setUsers(Array.isArray(usersResponse.data) ? usersResponse.data : usersResponse.data.data || []);
            } else {
                setUsers([]);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setError('Failed to fetch dashboard data: ' + (error.response?.data?.message || error.message));
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`http://localhost:4000/api/users/user/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchDashboardData();
            setDeleteDialogOpen(false);
            setUserToDelete(null);
        } catch (error) {
            setError('Failed to delete user: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        console.log('Logged out, userInfo cleared');
        navigate('/login');
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = `${user.name} ${user.email}`.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === 'all' || user.role === filterRole;
        return matchesSearch && matchesRole;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'success';
            case 'inactive': return 'error';
            case 'pending': return 'warning';
            default: return 'default';
        }
    };

    const StatCard = ({ title, value, icon, color, subtitle }) => (
        <Card className="stat-card" elevation={0}>
            <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box>
                        <Typography variant="h4" className="stat-value" color={color}>
                            {value}
                        </Typography>
                        <Typography variant="body2" className="stat-title">
                            {title}
                        </Typography>
                        {subtitle && (
                            <Typography variant="caption" className="stat-subtitle">
                                {subtitle}
                            </Typography>
                        )}
                    </Box>
                    <Avatar className={`stat-icon ${color}`}>
                        {icon}
                    </Avatar>
                </Box>
            </CardContent>
        </Card>
    );

    const UserListCard = ({ title, users, icon, color, emptyMessage }) => (
        <Paper className="user-list-card" elevation={0}>
            <Box className="card-header">
                <Typography variant="h6" className="card-title">
                    {title}
                </Typography>
                <Avatar className={`list-icon ${color}`}>
                    {icon}
                </Avatar>
            </Box>
            <List className="user-list">
                {users.length === 0 ? (
                    <ListItem>
                        <ListItemText
                            primary={emptyMessage}
                            className="empty-list-text"
                        />
                    </ListItem>
                ) : (
                    users.map((user, index) => (
                        <ListItem key={user._id || index} className="user-list-item">
                            <ListItemIcon className="user-list-icon">
                                <Avatar className="user-avatar-small">
                                    {user.name?.charAt(0) || 'U'}
                                </Avatar>
                            </ListItemIcon>
                            <ListItemText
                                primary={user.name || 'Unknown User'}
                                secondary={user.email}
                                className="user-list-text"
                            />
                            {user.role === 'collector' && user.vehicleInfo && (
                                <Chip
                                    label={user.vehicleInfo.type}
                                    size="small"
                                    className="vehicle-chip"
                                />
                            )}
                        </ListItem>
                    ))
                )}
            </List>
        </Paper>
    );

    return (
        <div className="admin-dashboard">
            {/* Top Navigation Bar */}
            <AppBar position="fixed" className="admin-appbar">
                <Toolbar>
                    <Typography variant="h6" className="appbar-title">
                        EcoLIFT Admin
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box display="flex" alignItems="center" gap={2}>
                        <Tooltip title="Notifications">
                            <IconButton color="inherit">
                                <Badge badgeContent={4} color="error">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Account">
                            <IconButton color="inherit">
                                <AccountCircleIcon />
                            </IconButton>
                        </Tooltip>
                        <Button 
                            variant="outlined" 
                            color="inherit" 
                            onClick={handleLogout}
                            startIcon={<LogoutIcon />}
                            className="logout-button"
                        >
                            Logout
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Box className="dashboard-content">
                <Container maxWidth="xl">
                    {/* Header Section */}
                    <Box className="dashboard-header">
                        <Typography variant="h3" className="dashboard-title">
                            Admin Dashboard
                        </Typography>
                        <Typography variant="body1" className="dashboard-subtitle">
                            Manage your EcoLIFT platform and monitor user activities
                        </Typography>
                    </Box>

                    {/* Stats Cards */}
                    <Grid container spacing={3} className="stats-section">
                        <Grid item xs={12} sm={6} md={3}>
                            <StatCard
                                title="Total Users"
                                value={userStats.totalUsers}
                                icon={<PeopleIcon />}
                                color="primary"
                                subtitle={`${userStats.totalCustomers} customers, ${userStats.totalCollectors} collectors`}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <StatCard
                                title="Customers"
                                value={userStats.totalCustomers}
                                icon={<PersonIcon />}
                                color="success"
                                subtitle={`+${userStats.newCustomers} this week`}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <StatCard
                                title="Collectors"
                                value={userStats.totalCollectors}
                                icon={<LocalShippingIcon />}
                                color="info"
                                subtitle={`+${userStats.newCollectors} this week`}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <StatCard
                                title="Active Users"
                                value={userStats.totalUsers}
                                icon={<CheckCircleIcon />}
                                color="warning"
                                subtitle="All users active"
                            />
                        </Grid>
                    </Grid>

                    {/* User Lists Section */}
                    <Grid container spacing={3} className="user-lists-section">
                        <Grid item xs={12} md={6}>
                            <UserListCard
                                title="Recent Customers"
                                users={recentCustomers}
                                icon={<PersonIcon />}
                                color="success"
                                emptyMessage="No customers found"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <UserListCard
                                title="Recent Collectors"
                                users={recentCollectors}
                                icon={<LocalShippingIcon />}
                                color="info"
                                emptyMessage="No collectors found"
                            />
                        </Grid>
                    </Grid>
                   
                </Container>
            </Box>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                className="delete-dialog"
            >
                <DialogTitle className="dialog-title">
                    Confirm Delete
                </DialogTitle>
                <DialogContent className="dialog-content">
                    <Typography variant="body1">
                        Are you sure you want to delete user{' '}
                        <strong>{userToDelete ? userToDelete.name : ''}</strong>?
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                        This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions className="dialog-actions">
                    <Button onClick={() => setDeleteDialogOpen(false)} className="cancel-button">
                        Cancel
                    </Button>
                    <Button 
                        onClick={() => handleDelete(userToDelete?._id)} 
                        color="error" 
                        variant="contained"
                        className="delete-button"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Floating Action Button */}
            <Fab
                color="primary"
                aria-label="add"
                className="fab-add"
                onClick={() => {/* Handle add user */}}
            >
                <AddIcon />
            </Fab>
        </div>
    );
};

export default AdminDashboard;