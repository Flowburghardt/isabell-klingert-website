import React from 'react';
import './Hero.css';

const Hero: React.FC = () => {
  const handleCtaClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero section">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-headline">
              Veränderung beginnt, wenn Du bereit bist - mit Mut, Klarheit und echtem Gespräch.
            </h1>
            <p className="hero-subheadline">
              Ich begleite Menschen, die sich persönlich und beruflich weiterentwickeln möchten - 
              die bereit sind, hinzuschauen, mitzumachen und neue Perspektiven einzunehmen.
            </p>
            <button onClick={handleCtaClick} className="btn btn-primary hero-cta">
              Kennenlernen <span className="cta-note">(kostenfrei)</span>
            </button>
          </div>
          <div className="hero-image">
            <div className="image-placeholder">
              <div className="placeholder-text">
                Professionelles Businessfoto
                <br />
                <small>Blonde Frau, ca. 30 Jahre, blaue Bluse</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;