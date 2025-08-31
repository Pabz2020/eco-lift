import React, { useState, useEffect } from 'react';
import "./Hero.css";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import Testimonials from '../../Components/Testimonials/Testimonials';

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Array of 4 images for the carousel - Green theme
  const heroImages = [
    {
      src: "/images/carousel/leaves.jpeg",
      alt: "Close-up of fresh green leaves with sparkling water droplets, representing life and nature's purity."
    },
    {
      src: "/images/carousel/sprout.jpeg",
      alt: "Hands gently holding a small green sprout, symbolizing new growth and environmental stewardship."
    },
    {
      src: "/images/carousel/wind-turbines.jpeg",
      alt: "Wind turbines in a vast green field, showcasing renewable energy and a sustainable future."
    }
  ];

  // Auto-advance carousel every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Manual navigation functions
  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? heroImages.length - 1 : prevIndex - 1
    );
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  const handleReadMoreClick = () => {
    const aboutSection = document.getElementById('about-ecolift');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="hero-wrapper">
      <section id="home" className="hero">
        <div className="hero-image animate-fade-right">
          <div className="image-carousel">
            {heroImages.map((image, index) => (
              <img 
                key={index}
                src={image.src}
                alt={image.alt}
                className={`carousel-image ${index === currentImageIndex ? 'active' : ''}`}
              />
            ))}
            
            {/* Navigation Arrows */}
            <button 
              className="carousel-nav prev" 
              onClick={goToPrevious}
              aria-label="Previous image"
            >
              ‹
            </button>
            <button 
              className="carousel-nav next" 
              onClick={goToNext}
              aria-label="Next image"
            >
              ›
            </button>

            {/* Dots Indicator */}
            <div className="carousel-dots">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => goToImage(index)}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="hero-content animate-fade-left">
          <h1 className="gradient-text">Eco LIFT</h1>
          <p className="tagline">Be Green, Be Smart</p>
          <p>
            Eco LIFT is your partner in building a sustainable future. We provide innovative and convenient solutions for waste management, helping individuals and businesses reduce their environmental impact. Join us in making a difference, one pickup at a time.
          </p>
          <button 
            className="read-more pulse" 
            aria-label="Learn more about Eco Lift"
            onClick={handleReadMoreClick}
          >
            Read More
          </button>
        </div>
      </section>

      <section id="about-ecolift" className="about-section">
        <h2 className="gradient-text">About Eco LIFT</h2>
        <p className="about-description">
          At Eco LIFT, we are committed to revolutionizing waste management. Our platform connects you with local collectors, making it easy to schedule pickups for recyclable materials, e-waste, and more. We believe in creating a cleaner, greener planet for future generations.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <img 
              src="https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="A lightbulb containing a growing plant, symbolizing green ideas and efficient solutions" 
            />
            <h3>Efficient Collection</h3>
            <p>Our smart routing and scheduling system ensures timely and efficient waste collection with minimal environmental impact.</p>
          </div>
          <div className="feature-card">
            <img 
              src="https://images.pexels.com/photos/3845549/pexels-photo-3845549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="A diverse group of people planting trees together, representing community focus" 
            />
            <h3>Community Focused</h3>
            <p>We work with local communities to promote recycling, environmental awareness, and sustainable living practices.</p>
          </div>
          <div className="feature-card">
            <img 
              src="https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Wind turbines in a lush green field, showing a sustainable impact on the world" 
            />
            <h3>Sustainable Impact</h3>
            <p>By using Eco LIFT, you contribute to a circular economy, reduce landfill waste, and help protect our planet's future.</p>
          </div>
        </div>
      </section>

      <Testimonials />

      <section id="download" className="playstore-section" data-aos="fade-up">
        <div className="playstore-content">
          <h2 className="gradient-text">Download Our App</h2>
          <p>Get the Eco LIFT app and make your green journey smarter and more convenient.</p>
          <div className="app-buttons">
            <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer" className="app-store-button hover-effect">
              <div className="button-content">
                <span className="text-top">Download on the</span>
                <span className="text-bottom">
                  <img width="48" height="48" src="https://img.icons8.com/color/48/mac-os--v1.png" alt="app store" />
                  App Store
                </span>
              </div>
            </a>
            <a href="https://play.google.com/" target="_blank" rel="noopener noreferrer" className="google-play-button hover-effect">
              <div className="button-content">
                <span className="text-top">Get it on</span>
                <span className="text-bottom">
                  <img width="48" height="48" src="https://img.icons8.com/color/48/google-play.png" alt="google play" />
                  Google Play
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
