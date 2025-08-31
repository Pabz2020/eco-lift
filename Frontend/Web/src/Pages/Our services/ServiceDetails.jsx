import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { servicesData } from './servicesData';
import {
  Container,
  Typography,
  Paper,
  Button,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import './ServiceDetails.css';

const ServiceDetails = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  
  const service = servicesData.find(s => s.path === `/services/${serviceId}`);

  const handleBack = () => {
    navigate('/OurService');  // Navigate back to services page
  };

  if (!service) {
    return (
      <Container className="service-details-container">
        <Paper className="service-details-paper" elevation={3}>
          <Typography variant="h4" gutterBottom>Service not found</Typography>
          <Button 
            onClick={handleBack}
            startIcon={<ArrowBackIcon />}
            variant="outlined"
            className="back-button"
          >
            Back to Services
          </Button>
        </Paper>
      </Container>
    );
  }

  // A placeholder for key features, you can customize this for each service
  const keyFeatures = [
    "Feature one for " + service.title,
    "Feature two for " + service.title,
    "Feature three for " + service.title,
    "Feature four for " + service.title,
  ];

  return (
    <Container className="service-details-container">
      <Paper className="service-details-paper" elevation={3}>
        <Button 
          onClick={handleBack}
          startIcon={<ArrowBackIcon />}
          variant="outlined"
          className="back-button"
        >
          Back to Services
        </Button>
        
        <Box className="service-header">
          <Box className="service-image-container">
            <img 
              src={service.image} 
              alt={service.title}
              className="service-detail-image"
            />
          </Box>
          <Typography variant="h3" component="h1" className="service-title">
            {service.title}
          </Typography>
        </Box>
        
        <Typography variant="body1" className="service-long-description">
          {service.longDescription}
        </Typography>

        <Box className="key-features-section">
          <Typography variant="h5" component="h2" gutterBottom>
            Key Features
          </Typography>
          <List>
            {keyFeatures.map((feature, index) => (
              <ListItem key={index} disableGutters>
                <ListItemIcon>
                  <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary={feature} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Paper>
    </Container>
  );
};

export default ServiceDetails;