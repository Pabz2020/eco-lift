import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./OurService.css";
import { servicesData } from './servicesData';

export default function OurService() {
  const navigate = useNavigate();

  // Take only the first 6 services
  const displayedServices = servicesData.slice(0, 6);

  const handleServiceClick = (path) => {
    navigate(path);
  };

  return (
    <div className="our-services-page">
      <header className="our-services-header" data-aos="fade-in">
        <div className="header-content">
          <h1 className="our-services-title">Our Services</h1>
          <p className="our-services-subtitle">
            Comprehensive solutions for a sustainable future.
          </p>
        </div>
      </header>
      
      <section id="services" className="services-section">
        <div className="services-grid">
          {displayedServices.map((service, index) => (
            <div 
              key={service.id} 
              className="service-card" 
              data-aos="fade-up" 
              data-aos-delay={index * 100}
            >
              <img src={service.image} alt={service.title} />
              <h3>{service.title}</h3>
              <button 
                onClick={() => handleServiceClick(service.path)}
                className="learn-more"
              >
                Know More →
              </button>
            </div>
          ))}
        </div>
        <button 
          onClick={() => navigate('/services/all')} 
          className="view-more"
          data-aos="fade-up"
        >
          View All Services
        </button>
      </section>
    </div>
  );
}
