import React, { useState } from 'react';
import Clock from './relogio';


// Import icons
import Icon1 from './icons/4.png';
import Icon2 from './icons/2.png';
import Icon3 from './icons/3.png';

interface Section {
  id: number;
  name: string;
  icon: string;
}

interface NavbarProps {
  sections: Section[];
  toggleSection: (id: number) => void;
}

const Navbar: React.FC<NavbarProps> = ({ sections, toggleSection }) => {
  const [activeSection, setActiveSection] = useState<number | null>(null);

  const handleClick = (id: number) => {
    setActiveSection(id === activeSection ? null : id);
    toggleSection(id);
  };

  const sectionsWithIcons = sections.map((section) => {
    let iconPath = '';
    switch (section.id) {
      case 1:
        iconPath = Icon1;
        break;
      case 2:
        iconPath = Icon2;
        break;
      case 3:
        iconPath = Icon3;
        break;
      default:
        iconPath = Icon1; // Fallback icon
    }
    return { ...section, icon: iconPath };
  });

  const buttonBaseStyle: React.CSSProperties = {
    fontFamily: 'Montserrat, sans-serif',
    padding: '12px',
    cursor: 'pointer',
    borderRadius: '6px',
    transition: 'all 0.3s ease',
    border: 'none',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: '80px',
    minWidth: '50px',
    width:'auto',
  };

  const activeButtonStyle: React.CSSProperties = {
    ...buttonBaseStyle,
    backgroundColor: '#1E1E1E',
    color: 'white',
  };

  const inactiveButtonStyle: React.CSSProperties = {
    ...buttonBaseStyle,
    backgroundColor: 'transparent',
    color: 'transparent',
  };

  return (
    <nav style={{ width: '100%', overflow: 'hidden', maxWidth: '95vw' }}>
      <Clock />
      <ul style={{
        listStyle: 'none',
        padding: 0,
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}>
        {sectionsWithIcons.map((section) => (
          <li
            key={section.id}
            style={{
              display: 'flex',
              justifyContent: 'center',
              margin: '5px',
            }}
          >
            <button
              id={`button${section.id}`}
              onClick={() => handleClick(section.id)}
              style={activeSection === section.id ? activeButtonStyle : inactiveButtonStyle}
            >
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
              <img src={section.icon} alt={`Icon for ${section.name}`} style={{ width: '50px', height: '50px', verticalAlign: 'middle', marginRight: '10px' }} />
              <span style={{
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                transition: 'max-width 0.3s ease',
                maxWidth: activeSection === section.id ? '100px' : '0',
              }}>
                {section.name}
              </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
