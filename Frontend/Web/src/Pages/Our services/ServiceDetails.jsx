import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { servicesData } from './servicesData';
import {
  Container,
  Typography,
  Paper,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './ServiceDetails.css';

// Team members data
const teamMembers = [
  {
    id: 1,
    name: "Ashan",
    role: "Team Lead",
    image: "/images/ashan.jpeg",
    description: "Leading our waste management initiatives with expertise in environmental sustainability."
  },
  {
    id: 2,
    name: "Ishan",
    role: "Technical Specialist",
    image: "/images/ishan.jpeg",
    description: "Specializing in e-waste and battery waste management technologies."
  },
  {
    id: 3,
    name: "Pabasara",
    role: "Operations Manager",
    image: "/images/pabasara.jpeg",
    description: "Managing day-to-day operations and ensuring service quality standards."
  },
  {
    id: 4,
    name: "Sasini",
    role: "Environmental Consultant",
    image: "/images/sasini.jpeg",
    description: "Providing expert guidance on environmental compliance and sustainability."
  },
  {
    id: 5,
    name: "Team Member 5",
    role: "Logistics Coordinator",
    image: "/images/123.jpeg",
    description: "Coordinating waste collection and transportation logistics efficiently."
  },
  {
    id: 6,
    name: "Team Member 6",
    role: "Customer Relations",
    image: "/images/123.jpg",
    description: "Ensuring excellent customer service and maintaining client relationships."
  }
];

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

        {/* Meet Our Team Section */}
        <Box sx={{ mt: 6, mb: 4 }}>
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom 
            sx={{ 
              textAlign: 'center', 
              mb: 4,
              fontWeight: 'bold',
              color: '#2e7d32'
            }}
          >
            Meet Our Team
          </Typography>
          
          <Box className="team-grid-container">
            {teamMembers.map((member) => (
              <Card 
                key={member.id}
                elevation={3}
                className="team-member-card"
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    boxShadow: 4
                  }
                }}
              >
                  <Box sx={{ p: 2, textAlign: 'center' }}>
                    <Avatar
                      src={member.image}
                      alt={member.name}
                      sx={{ 
                        width: 120, 
                        height: 120, 
                        mx: 'auto',
                        mb: 2,
                        border: '3px solid #2e7d32'
                      }}
                    />
                  </Box>
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                    <Typography 
                      variant="h6" 
                      component="h3" 
                      gutterBottom
                      sx={{ fontWeight: 'bold', color: '#2e7d32' }}
                    >
                      {member.name}
                    </Typography>
                    <Typography 
                      variant="subtitle1" 
                      color="primary" 
                      gutterBottom
                      sx={{ fontWeight: 'medium', mb: 2 }}
                    >
                      {member.role}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ lineHeight: 1.6 }}
                    >
                      {member.description}
                    </Typography>
                  </CardContent>
                </Card>
            ))}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ServiceDetails;