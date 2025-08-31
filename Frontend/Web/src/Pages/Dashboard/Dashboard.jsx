import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Paper,
    Grid,
    Card,
    CardContent,
    Button,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import RecyclingIcon from '@mui/icons-material/Recycling';
import StarIcon from '@mui/icons-material/Star';
import ErrorIcon from '@mui/icons-material/Error';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { motion } from 'framer-motion';

const mockStats = {
    scheduled: 2,
    completed: 8,
    points: 120,
    notifications: 3,
    missed: 1,
    recyclingRate: '85%',
    totalWaste: '320kg',
    badges: 4
};

const mockRecentActivity = [
    { id: 1, action: 'Scheduled a pickup', date: '2024-06-10', status: 'Scheduled' },
    { id: 2, action: 'Pickup completed', date: '2024-06-08', status: 'Completed' },
    { id: 3, action: 'Earned 20 points', date: '2024-06-08', status: 'Points' },
    { id: 4, action: 'Received notification: Pickup reminder', date: '2024-06-07', status: 'Notification' },
    { id: 5, action: 'Missed a scheduled pickup', date: '2024-06-06', status: 'Missed' },
    { id: 6, action: 'Recycled 10kg of plastic', date: '2024-06-05', status: 'Recycling' },
    { id: 7, action: 'Earned Eco Badge: Green Hero', date: '2024-06-04', status: 'Badge' },
    { id: 8, action: 'Account warning: Missed 2 pickups', date: '2024-06-03', status: 'Warning' },
    { id: 10, action: 'Streak: 5 pickups in a row!', date: '2024-06-01', status: 'Streak' },
];

const Dashboard = () => {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        navigate('/login');
    };

    const handleSchedulePickup = () => {
        // Navigate to schedule pickup page (implement route as needed)
        alert('Navigate to schedule pickup page');
    };

    const handleViewHistory = () => {
        // Navigate to pickup history page (implement route as needed)
        alert('Navigate to pickup history page');
    };

    const handleEditProfile = () => {
        // Navigate to edit profile page (implement route as needed)
        alert('Navigate to edit profile page');
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h4">Welcome, {userInfo?.firstName}</Typography>
                        <Button variant="contained" color="error" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Paper>
                </Grid>
                {/* Stat Cards */}
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        {[
                            { label: 'Scheduled', value: mockStats.scheduled, icon: <EventAvailableIcon />, color: 'primary.main' },
                            { label: 'Completed', value: mockStats.completed, icon: <CheckCircleIcon />, color: 'success.main' },
                            { label: 'Points', value: mockStats.points, icon: <EmojiEventsIcon />, color: 'warning.main' },
                            { label: 'Notifications', value: mockStats.notifications, icon: <NotificationsIcon />, color: 'info.main' },
                            { label: 'Missed', value: mockStats.missed, icon: <DeleteIcon />, color: 'error.main' },
                            { label: 'Recycling Rate', value: mockStats.recyclingRate, icon: <RecyclingIcon />, color: 'success.light' },
                            { label: 'Badges', value: mockStats.badges, icon: <StarIcon />, color: 'warning.dark' },
                        ].map((stat, idx) => (
                            <Grid item xs={12} sm={6} md={3} lg={2} key={stat.label}>
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1, duration: 0.6, type: 'spring' }}
                                >
                                    <Card sx={{ display: 'flex', alignItems: 'center', p: 2, boxShadow: 3 }}>
                                        <Avatar sx={{ bgcolor: stat.color, mr: 2 }}>
                                            {stat.icon}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="h6">{stat.label}</Typography>
                                            <Typography variant="h5">{stat.value}</Typography>
                                        </Box>
                                    </Card>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                {/* Quick Actions */}
                <Grid item xs={12} md={4}>
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.7, type: 'spring' }}
                    >
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>Quick Actions</Typography>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    startIcon={<AddCircleIcon />}
                                    sx={{ mb: 2 }}
                                    onClick={handleSchedulePickup}
                                >
                                    Schedule Pickup
                                </Button>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    startIcon={<HistoryIcon />}
                                    sx={{ mb: 2 }}
                                    onClick={handleViewHistory}
                                >
                                    View History
                                </Button>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    startIcon={<PersonIcon />}
                                    onClick={handleEditProfile}
                                >
                                    Edit Profile
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                </Grid>
                {/* Recent Activity */}
                <Grid item xs={12} md={8}>
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.7, type: 'spring' }}
                    >
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>Recent Activity</Typography>
                                <List>
                                    {mockRecentActivity.map((activity, idx) => (
                                        <motion.div
                                            key={activity.id}
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.7 + idx * 0.07, duration: 0.5, type: 'spring' }}
                                        >
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        {activity.status === 'Scheduled' && <EventAvailableIcon color="primary" />}
                                                        {activity.status === 'Completed' && <CheckCircleIcon color="success" />}
                                                        {activity.status === 'Points' && <EmojiEventsIcon color="warning" />}
                                                        {activity.status === 'Notification' && <NotificationsIcon color="info" />}
                                                        {activity.status === 'Missed' && <DeleteIcon color="error" />}
                                                        {activity.status === 'Recycling' && <RecyclingIcon color="success" />}
                                                        {activity.status === 'Badge' && <StarIcon color="warning" />}
                                                        {activity.status === 'Warning' && <ErrorIcon color="error" />}
                                                        {activity.status === 'Streak' && <LocalFireDepartmentIcon color="warning" />}
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={activity.action}
                                                    secondary={activity.date}
                                                />
                                            </ListItem>
                                            {idx < mockRecentActivity.length - 1 && <Divider variant="inset" component="li" />}
                                        </motion.div>
                                    ))}
                                </List>
                            </CardContent>
                        </Card>
                    </motion.div>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;