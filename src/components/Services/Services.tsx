import React from 'react';
import './Services.css';
import type { Service } from '../../types';

const Services: React.FC = () => {
  const services: Service[] = [
    {
      id: 'psychological-coaching',
      title: 'Psychologische Begleitung & Coaching',
      description: 'Für Einzelpersonen, Berufstätige und Führungskräfte',
      pricing: 'Einzelstunde (45min): 85€\nDoppelstunde (90min): 160€',
      ctaText: 'Erstgespräch vereinbaren (kostenfrei)',
      ctaType: 'primary'
    },
    {
      id: 'supervision',
      title: 'Supervision',
      description: 'Für Teams und Unternehmen',
      pricing: 'Gruppenworkshop / halb- oder ganztätig\nPreis auf Anfrage',
      ctaText: 'Termin anfragen (unverbindlich)',
      ctaType: 'secondary'
    },
    {
      id: 'business-coaching',
      title: 'Business Coaching',
      description: 'Für Führungskräfte und Fachkräfte\nKarriereplanung und Stressmanagement',
      pricing: 'Individual-Preise',
      ctaText: 'Beratung anfragen',
      ctaType: 'secondary'
    }
  ];

  const handleCtaClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="services section">
      <div className="container">
        <h2 className="services-title">Meine Angebote</h2>
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <h3 className="service-title">{service.title}</h3>
              <div className="service-description">
                {service.description.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
              <div className="service-pricing">
                {service.pricing.split('\n').map((line, index) => (
                  <p key={index} className="pricing-line">{line}</p>
                ))}
              </div>
              <button 
                onClick={handleCtaClick}
                className={`btn ${service.ctaType === 'primary' ? 'btn-primary' : 'btn-secondary'} service-cta`}
              >
                {service.ctaText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;