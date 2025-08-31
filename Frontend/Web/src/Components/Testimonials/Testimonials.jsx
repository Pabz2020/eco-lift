import React from 'react';
import './Testimonials.css';

const testimonialsData = [
  {
    quote: "Eco LIFT has transformed the way our company handles waste. Their service is reliable, efficient, and has helped us meet our sustainability goals.",
    name: "John Doe",
    company: "Green Enterprises",
    avatar: "/images/avatar1.png"
  },
  {
    quote: "As a homeowner, I appreciate how easy it is to schedule pickups. The app is user-friendly, and the collectors are always on time.",
    name: "Jane Smith",
    company: "Homeowner",
    avatar: "/images/avatar2.png"
  },
  {
    quote: "The best part about Eco LIFT is their commitment to the environment. I'm proud to be a part of a community that cares about our planet.",
    name: "Samuel Green",
    company: "Eco Warrior",
    avatar: "/images/avatar3.png"
  }
];

const Testimonials = () => {
  return (
    <section className="testimonials-section" data-aos="fade-up">
      <div className="testimonials-container">
        <h2 className="testimonials-title">What Our Customers Say</h2>
        <div className="testimonials-grid">
          {testimonialsData.map((testimonial, index) => (
            <div key={index} className="testimonial-card" data-aos="fade-up" data-aos-delay={index * 100}>
              <img src={testimonial.avatar} alt={testimonial.name} className="testimonial-avatar" />
              <p className="testimonial-quote">"{testimonial.quote}"</p>
              <div className="testimonial-author">
                <span className="testimonial-name">{testimonial.name}</span>
                <span className="testimonial-company">{testimonial.company}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 