import React from 'react';
import { Star, Flag, Award } from 'lucide-react';
import './styles.css';

const Advantages = () => {
  return (
    <section className="advantages">
      <div className="advantages-container">
        <h2 className="advantages-heading">OUR ADVANTAGES</h2>
        <p className="advantages-description">
          We are here to save your money on the top-notch gas and oil solutions
          and offer you friendly informed customer service while making a
          positive influence on your companys success.
        </p>
        <div className="advantages-grid">
          <div className="advantage-card">
            <Star className="advantage-icon" />
            <h3 className="advantage-title">Core Values</h3>
            <p className="advantage-text">
              Our core values have been shaped over more than 10 years of
              delivering the finest oil & gas services to our clients. They
              stood to the test of time and these principles remain our bedrock
              lynchpins. We never tried to cut on either quality the pace of
              work or any other aspect.
            </p>
          </div>
          <div className="advantage-card">
            <Flag className="advantage-icon" />
            <h3 className="advantage-title">Pace</h3>
            <p className="advantage-text">
              Our love for detailed bullet-point preparations as well as to open
              and clear project management and communication is what makes us
              faster than the competition. Recently we compared a technically
              similar oil & gas well we have built and installed pipes for and
              the...
            </p>
          </div>
          <div className="advantage-card">
            <Award className="advantage-icon" />
            <h3 className="advantage-title">Focus On Quality</h3>
            <p className="advantage-text">
              Quality is focal in every little aspect of the construction. The
              mindset of both our senior employees and all the way to our on
              site contractors and construction workers centers on attention. It
              is out attention to details that allows us to work on a multitude
              of projects...
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advantages;
