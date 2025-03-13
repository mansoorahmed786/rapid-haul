// Footer.jsx
import React from 'react';
import { PhoneCall, MapPinned } from 'lucide-react';
import './styles.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPinterest,
  faFacebook,
  faXTwitter,
  faGooglePlusG,
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <div className="footer-container">
      <section className="clients-section">
        <h2 className="section-title">OUR CLIENTS</h2>
        <p className="clients-subtitle">
          15,000 customers + 20,000 locations and companies trust us .
        </p>

        <div className="client-logos">
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <div
              key={index}
              className={`client-logo ${index % 2 === 0 ? 'rounded' : 'rectangular'}`}
            >
              <span>company name</span>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-container">
          <h2 className="newsletter-title">Newsletter</h2>
          <input
            type="email"
            placeholder="Enter your email"
            className="newsletter-input"
          />
          <button className="subscribe-button">SUBSCRIBE</button>
        </div>
      </section>

      {/* Footer Info Section */}
      <section className="footer-info">
        <div className="copyright">© 2025 Terms of Use | Privacy Policy</div>

        <div className="address">
          <MapPinned className="icon" size={45} />
          <div>
            <div>
              6036 Richmond hwy,
              <br />
              Alexandria, VA USA 22303
            </div>
            <div className="email">info@demolink.org</div>
          </div>
        </div>

        <div className="phone-email">
          <div>
            <PhoneCall className="icon" size={45} />
          </div>
          <div className="phone-numbers">
            <span>1-800-123-4567</span>
            <span>1-800-123-4567</span>
          </div>
        </div>

        <div className="social-links">
          <FontAwesomeIcon className="icons" icon={faPinterest} />
          <FontAwesomeIcon className="icons" icon={faFacebook} />
          <FontAwesomeIcon className="icons" icon={faXTwitter} />
          <FontAwesomeIcon className="icons" icon={faGooglePlusG} />
        </div>
      </section>
    </div>
  );
};

export default Footer;
