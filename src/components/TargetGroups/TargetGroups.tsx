import React from 'react';
import './TargetGroups.css';
import type { TargetGroup } from '../../types';

const TargetGroups: React.FC = () => {
  const targetGroups: TargetGroup[] = [
    { description: 'Menschen unter Stress, Ängsten oder Erschöpfung' },
    { description: 'Berufstätige und Führungskräfte, die mentale Stärke suchen' },
    { description: 'Menschen mit körperlichen Beschwerden ohne klare medizinische Ursache' },
    { description: 'Expats und internationale Fachkräfte' },
  ];

  return (
    <section className="target-groups section">
      <div className="container">
        <div className="target-groups-content">
          <h2 className="target-groups-headline">
            Wie beeinflussen Stress, Ängste oder ungelöste Blockaden dein Wohlbefinden und umgekehrt? 
            Welche unbewussten Muster halten Dich zurück, sei es im Job oder in Beziehungen?
          </h2>
          
          <h3 className="target-groups-subtitle">Für wen:</h3>
          
          <ul className="target-groups-list">
            {targetGroups.map((group, index) => (
              <li key={index} className="target-group-item">
                <div className="target-group-icon">✓</div>
                <span>{group.description}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TargetGroups;