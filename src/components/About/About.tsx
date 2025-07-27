import React from 'react';
import './About.css';
import type { Qualification } from '../../types';

const About: React.FC = () => {
  const qualifications: Qualification[] = [
    { degree: 'M.Sc.', field: 'Psychologische Medizin' },
    { degree: 'B.Sc.', field: 'Wirtschaftspsychologie' },
    { degree: '', field: 'International Administration Management' },
  ];

  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2>Ich bin Isabell Klingert, Psychologische Beraterin und Coach</h2>
            <p className="about-description">
              Mit meinem Hintergrund in Wirtschaftspsychologie, psychologischer Medizin und 
              internationalem Management betrachte ich den Menschen ganzheitlich: Wie beeinflussen 
              Stress, Ängste oder ungelöste Blockaden dein Wohlbefinden – und umgekehrt? Welche 
              unbewussten Muster halten Dich zurück, sei es im Job, in Beziehungen oder in deiner Gesundheit?
            </p>
            
            <div className="qualifications">
              <h3>Qualifikationen</h3>
              <ul className="qualifications-list">
                {qualifications.map((qual, index) => (
                  <li key={index} className="qualification-item">
                    <span className="degree">{qual.degree}</span> {qual.field}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="about-image">
            <div className="image-placeholder about-placeholder">
              <div className="placeholder-text">
                Professionelles Foto
                <br />
                <small>Hellgraues Jacket, authentisch</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;