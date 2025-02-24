'use client';

import { Button } from 'antd';

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
        <Button type="link">Contact Us</Button>
      </div>
    </section>
  );
};

export default CTA;
