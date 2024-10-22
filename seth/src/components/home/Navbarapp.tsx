import React from 'react';
import Clock from './relogio'; 
import ContentLogin from '../login/contentLogin';

interface NavbarProps {
  sections: { id: number; }[];
  toggleSection: (id: number) => void;
}

const Navbar: React.FC<NavbarProps> = ({ sections, toggleSection }) => {
  return (
    <nav>
      <Clock />
      <ul>
        {sections.map((section, index) => (
          <li key={section.id}>
            <button id={`button${index + 1}`} onClick={() => toggleSection(section.id)}>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
