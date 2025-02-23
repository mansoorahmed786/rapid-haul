'use client';

import { Link } from 'react-router-dom';
import './styles.css';

const CTA = () => {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <h2 className="cta-title">
          Implementation of oil field projects of any complexity
        </h2>
        <p className="cta-description">
          We provide fuel for transportation, energy for heat and light,
          lubricants to keep engines moving and petrochemicals to make everyday
          items.
        </p>
        <Link href="#" className="cta-button">
          CONTACT US
        </Link>
      </div>
    </section>
  );
};

export default CTA;
