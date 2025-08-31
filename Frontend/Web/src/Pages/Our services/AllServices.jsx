import React from 'react';
import { useNavigate } from 'react-router-dom';
import { servicesData } from './servicesData';
import './AllServices.css'; // A new stylesheet for this page

export default function AllServices() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/OurService');
  };

  return (
    <div className="all-services-container">
      <button onClick={handleBack} className="back-button-full">
        &larr; Back to Services
      </button>
      <h1 className="main-title">Our Services</h1>
      {servicesData.map((service) => (
        <section key={service.id} className="service-section-full">
          <div className="service-header-full">
            <img src={service.image} alt={service.title} className="service-image-full" />
            <div className="service-content-full">
              <h2 className="service-title-full">{service.title}</h2>
              <p className="service-description-full">{service.longDescription}</p>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
} 