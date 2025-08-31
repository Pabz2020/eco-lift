import React from 'react';
import './AboutUs.css'; // New stylesheet

const teamMembers = [
  {
    name: "Pabasara Jayawardhana",
    role: "Chairman",
    bio: "An artist is someone engaged in an activity deemed to be art.",
    image: "/images/pabasara.jpeg"
  },
  {
    name: "Sasini Perera",
    role: "Boss",
    bio: "An artist is someone engaged in an activity deemed to be art.",
    image: "/images/sasini.jpeg"
  },
  {
    name: "Ashan Munasinghe",
    role: "UI/UX Designer",
    bio: "An artist is someone engaged in an activity deemed to be art.",
    image: "/images/ashan.jpeg"
  },
  {
    name: "Ishan Kendawela",
    role: "Artist",
    bio: "An artist is someone engaged in an activity deemed to be art.",
    image: "/images/ishan.jpeg"
  }
];

export default function AboutUs() {
  return (
    <div className="about-us-page">
      <header className="about-us-header" data-aos="fade-in">
        <div className="header-content">
          <h1 className="about-us-title">About Eco LIFT</h1>
          <p className="about-us-subtitle">
            Pioneering a sustainable future through innovative waste management solutions.
          </p>
        </div>
      </header>

      <section className="company-info-section">
        <div className="info-card" data-aos="fade-right">
          <h2>Our Mission</h2>
          <p>
            To provide convenient, reliable, and eco-friendly waste management services that empower communities to contribute to a cleaner, greener planet. We are committed to reducing landfill waste and promoting a circular economy through technology and education.
          </p>
        </div>
        <div className="info-card" data-aos="fade-left">
          <h2>Our Vision</h2>
          <p>
            To be a global leader in sustainable waste management, creating a world where waste is seen as a resource, and every individual is an active participant in building a zero-waste future for generations to come.
          </p>
        </div>
      </section>

      <section className="team-section" data-aos="fade-up">
        <h2 className="team-title">Meet Our Team</h2>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member-card" data-aos="fade-up" data-aos-delay={index * 100}>
              <img src={member.image} alt={member.name} className="team-member-image" />
              <h3 className="team-member-name">{member.name}</h3>
              <p className="team-member-role">{member.role}</p>
              <p className="team-member-bio">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
