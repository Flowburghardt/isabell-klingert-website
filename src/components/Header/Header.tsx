import React, { useState } from 'react';
import './Header.css';
import type { NavigationItem } from '../../types';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems: NavigationItem[] = [
    { label: 'Über mich', href: '#about' },
    { label: 'Meine Angebote', href: '#services' },
    { label: 'Kontakt', href: '#contact' },
  ];

  const handleCtaClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <div className="logo-name">isabell klingert</div>
            <div className="logo-subtitle">Psychologie und Coaching</div>
          </div>

          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-list">
              {navigationItems.map((item) => (
                <li key={item.href} className="nav-item">
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className="nav-link"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <button onClick={handleCtaClick} className="btn btn-primary header-cta">
            Kennenlernen
          </button>

          <button
            className="mobile-menu-toggle"
            onClick={handleMenuToggle}
            aria-label="Menü öffnen/schließen"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;