import React from 'react';
import './footter.css';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section about-us">
                    <h4>About Eco LIFT</h4>
                    <p>
                        Eco LIFT is your partner in creating a sustainable future. We provide innovative and eco-friendly waste management solutions for individuals and businesses.
                    </p>
                </div>
                <div className="footer-section quick-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/services">Services</a></li>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/contact">Contact</a></li>
                        <li><a href="/faq">FAQ</a></li>
                    </ul>
                </div>
                <div className="footer-section contact-info">
                    <h4>Contact Info</h4>
                    <p><FaMapMarkerAlt /> Hapugala, Galle, Sri Lanka</p>
                    <p><FaPhone /> +123 456 7890</p>
                    <p><FaEnvelope /> ecolift@gmail.com</p>
                </div>
                <div className="footer-section follow-us">
                    <h4>Follow Us</h4>
                    <p>Stay connected with us on social media for the latest news.</p>
                    <div className="social-icons">
                        <a href="#"><FaFacebook /></a>
                        <a href="#"><FaTwitter /></a>
                        <a href="#"><FaLinkedin /></a>
                        <a href="#"><FaInstagram /></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} Eco LIFT. All Rights Reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
