import React, { useEffect } from "react";
import "./Navbar.css"; // Make sure to style the navbar here.
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";

const Navbar = () => {
  console.log("Navbar component loaded");

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="navbar">
      <header className="header">
        {/* Social Media Icons */}
        <div className="social-icons">
          <a href="http://www.facebook.com" className="icon" aria-label="Facebook"><FaFacebook /></a>
          <a href="http://www.linkedin.com" className="icon" aria-label="LinkedIn"><FaLinkedin /></a>
          <a href="http://www.youtube.com" className="icon" aria-label="YouTube"><FaYoutube /></a>
        </div>

        {/* Contact Information */}
        <div className="contact-info">
          <span>
          <BsFillTelephoneFill/> 
            +94 764948887
          </span>
          <span>
          <FaLocationDot />
            Hapugala, Galle
          </span>
          <span>
          <MdOutlineMail />
            ecolift@gmail.com
          </span>
        </div>
      </header>
</nav>

  );
};

export default Navbar;
