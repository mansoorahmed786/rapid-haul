import React from 'react';
import './styles.css';
import { Image } from 'antd';

const Manufactures = () => {
  return (
    <section className="manufacturers">
      <div className="manufacturers-container">
        <div className="manufacturers-content">
          <p className="manufacturers-label">MANUFACTURERS</p>
          <h2 className="manufacturers-title">
            We have major operations set up in some of the worlds most important
            oil and gas regions.
          </h2>
          <p className="manufacturers-description">
            Our upstream business combines technological and
            environmentally-friendly innovations and the effective use of
            technology to maximize mature fields, discover new resources and
            meet the worlds growing demand for energy.
          </p>
          <a href="#" className="manufacturers-button">
            READ MORE
          </a>
        </div>
        <Image
  src="/manufactures.jpg"
  alt="Blog Thumbnail"
  width={300}
  height={200}
/>
      </div>
    </section>
  );
};

export default Manufactures;
