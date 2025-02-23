import { Battery, Factory } from 'lucide-react';
import './styles.css';

const Features = () => {
  return (
    <section className="features">
      <div className="features-container">
        <div className="feature-card">
          <Factory className="feature-icon" />
          <div className="feature-content">
            <h3>Our Technology</h3>
            <p>
              We invest in technologies that we expect will make the most
              difference to our business and the energy industry.
            </p>
          </div>
        </div>
        <div className="feature-card">
          <Battery className="feature-icon" />
          <div className="feature-content">
            <h3>Energy Economics</h3>
            <p>
              The Statistical Review provides historic data on world energy
              markets, while the Energy Outlook makes projections to 2035.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
