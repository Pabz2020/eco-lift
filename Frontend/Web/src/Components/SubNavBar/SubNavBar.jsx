import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import "./Navbar.css";

export default function SubNavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [active, setActive] = useState('/');
    const navigate = useNavigate();
    const navRef = useRef(null);

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleLinkClick = (path) => {
        setActive(path);
        navigate(path);
        setIsOpen(false); // Close menu on link click
    };

    const handleClickOutside = (event) => {
        if (navRef.current && !navRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={navRef}>
            <nav className="navbar">
                <div className="logo" onClick={() => handleLinkClick('/')}>ECO LIFT</div>
                <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
                    <li><button className={active === '/' ? 'active' : ''} onClick={() => handleLinkClick('/')}>Home</button></li>
                    <li><button className={active === '/OurService' ? 'active' : ''} onClick={() => handleLinkClick('/OurService')}>Our Services</button></li>
                    <li><button className={active === '/AboutUs' ? 'active' : ''} onClick={() => handleLinkClick('/AboutUs')}>About Us</button></li>
                    <li><button className={active === '/Contact' ? 'active' : ''} onClick={() => handleLinkClick('/Contact')}>Contact</button></li>
                    <li><button className={active === '/Login' ? 'active' : ''} onClick={() => handleLinkClick('/Login')}>Login</button></li>
                </ul>
                <div className={`menu-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </nav>
        </div>
    );
}



