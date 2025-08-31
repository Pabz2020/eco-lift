import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaHeadset, FaGlobe } from 'react-icons/fa';

export default function Contact() {
  const form = useRef();
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_phone: '',
    service_type: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // EmailJS configuration
    const serviceId = 'YOUR_EMAILJS_SERVICE_ID'; // Replace with your EmailJS service ID
    const templateId = 'YOUR_EMAILJS_TEMPLATE_ID'; // Replace with your EmailJS template ID
    const publicKey = 'YOUR_EMAILJS_PUBLIC_KEY'; // Replace with your EmailJS public key
    
    // Add recipient email to form data
    const formDataWithRecipient = {
      ...formData,
      to_email: 'ishankendawela@gmail.com'
    };

    emailjs.sendForm(serviceId, templateId, form.current, publicKey)
      .then((result) => {
        console.log('SUCCESS!', result.text);
        setSubmitStatus('success');
        setFormData({
          user_name: '',
          user_email: '',
          user_phone: '',
          service_type: '',
          message: ''
        });
      }, (error) => {
        console.log('FAILED...', error.text);
        setSubmitStatus('error');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="contact-page">
      <header className="contact-header" data-aos="fade-in">
        <div className="header-content">
          <h1 className="contact-title">Get in Touch</h1>
          <p className="contact-subtitle">
            We're here to help and answer any question you might have. We look forward to hearing from you.
          </p>
        </div>
      </header>

      <div className="contact-body">
        <div className="contact-details" data-aos="fade-right">
          <h2>Contact Information</h2>
          <p className="contact-intro">
            Ready to start your eco-friendly journey? Fill up the form and our dedicated team will get back to you within 24 hours.
          </p>
          
          <div className="contact-info-grid">
            <div className="contact-info-item">
              <div className="contact-icon-wrapper">
                <FaPhone className="contact-icon" />
              </div>
              <div className="contact-info-content">
                <h3>Phone Number</h3>
                <p>+94 764948887</p>
                <span className="contact-note">Call us anytime</span>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-icon-wrapper">
                <FaEnvelope className="contact-icon" />
              </div>
              <div className="contact-info-content">
                <h3>Email Address</h3>
                <p>ishankendawela@gmail.com</p>
                <span className="contact-note">We'll respond quickly</span>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-icon-wrapper">
                <FaMapMarkerAlt className="contact-icon" />
              </div>
              <div className="contact-info-content">
                <h3>Office Location</h3>
                <p>Hapugala, Galle, Sri Lanka</p>
                <span className="contact-note">Visit our headquarters</span>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-icon-wrapper">
                <FaClock className="contact-icon" />
              </div>
              <div className="contact-info-content">
                <h3>Business Hours</h3>
                <p>Mon - Fri: 8:00 AM - 6:00 PM</p>
                <span className="contact-note">Sat: 9:00 AM - 4:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-container" data-aos="fade-left">
          <h2>Send Us a Message</h2>
          <p className="form-intro">Tell us about your waste management needs and we'll provide a customized solution.</p>
          
          {submitStatus === 'success' && (
            <div className="success-message">
              <FaEnvelope className="success-icon" />
              <p>Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.</p>
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="error-message">
              <p>Sorry! There was an error sending your message. Please try again or contact us directly.</p>
            </div>
          )}

          <form ref={form} className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input 
                type="text" 
                name="user_name"
                placeholder="Your Full Name" 
                value={formData.user_name}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div className="form-group">
              <input 
                type="email" 
                name="user_email"
                placeholder="Your Email Address" 
                value={formData.user_email}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div className="form-group">
              <input 
                type="tel" 
                name="user_phone"
                placeholder="Your Phone Number" 
                value={formData.user_phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <select 
                name="service_type"
                value={formData.service_type}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Service Type</option>
                <option value="recycling">Recycling Services</option>
                <option value="ewaste">E-Waste Collection</option>
                <option value="organic">Organic Waste</option>
                <option value="general">General Waste</option>
                <option value="other">Other Services</option>
              </select>
            </div>
            <div className="form-group">
              <textarea 
                name="message"
                placeholder="Tell us about your requirements..." 
                rows="6" 
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <button type="submit" disabled={isSubmitting}>
              <FaEnvelope className="button-icon" />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>

      <div className="map-container" data-aos="fade-up">
        <h2>Find Us</h2>
        <p>Visit our office in Hapugala, Galle, Sri Lanka</p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.2345678901234!2d80.218569314789!3d6.053516995585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae173d78c000001%3A0x23c9a2a7b6a0a0e!2sHapugala%2C%20Galle%2C%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1620912185569!5m2!1sen!2slk"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Google Maps Location of Hapugala, Galle, Sri Lanka"
        ></iframe>
      </div>
    </div>
  );
}
