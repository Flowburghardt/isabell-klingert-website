import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-logo">
              <div className="logo-name">isabell klingert</div>
              <div className="logo-subtitle">Psychologie und Coaching | Selbstzahlerbasis</div>
            </div>
            
            <div className="footer-contact">
              <h4>Kontakt</h4>
              <p>E-Mail: info@isabell-klingert.de</p>
              <p>Telefon: +49 (0) 123 456 7890</p>
              <p>Leipzig, Sachsen</p>
            </div>
          </div>
          
          <div className="footer-legal">
            <nav className="legal-nav">
              <a href="#impressum" className="legal-link">Impressum</a>
              <a href="#datenschutz" className="legal-link">Datenschutz</a>
            </nav>
          </div>
          
          <div className="footer-disclaimer">
            <p className="disclaimer-text">
              <strong>Wichtiger Hinweis:</strong> Die angebotene psychologische Beratung und das Coaching 
              stellen keinen Ersatz für eine Psychotherapie dar und sind nicht zur Behandlung von 
              psychischen Erkrankungen geeignet. Bei schwerwiegenden psychischen Problemen wenden Sie 
              sich bitte an einen Arzt, Psychotherapeuten oder eine entsprechende Beratungsstelle.
            </p>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2024 Isabell Klingert. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;