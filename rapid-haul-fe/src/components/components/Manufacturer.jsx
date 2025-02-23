import React from 'react';
import './styles.css';

const Manufactures = () => {
  return (
    <section className="manufacturers">
      <div className="manufacturers-container">
        <div className="manufacturers-content">
          <p className="manufacturers-label">MANUFACTURERS</p>
          <h2 className="manufacturers-title">
            We have major operations set up in some of the world's most
            important oil and gas regions.
          </h2>
          <p className="manufacturers-description">
            Our upstream business combines technological and
            environmentally-friendly innovations and the effective use of
            technology to maximize mature fields, discover new resources and
            meet the world's growing demand for energy.
          </p>
          <a href="#" className="manufacturers-button">
            READ MORE
          </a>
        </div>
        <div>
          <img
            src="https://livedemo00.template-help.com/joomla_63689/images/home/page1_img1.jpg"
            alt="Gas pump illustration"
            className="manufacturers-image"
          />
        </div>
      </div>
    </section>
  );
};

export default Manufactures;
