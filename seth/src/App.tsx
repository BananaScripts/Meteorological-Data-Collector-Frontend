import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/home/Navbarapp';
import Content from './components/home/contentHome';
import ContentClima from './components/clima/contentClima';
import ContentEducation from './components/education/contentEducation';
import ContentRelatorios from './components/relatorios/contentRelatorios';
import ContentLogin from './components/login/contentLogin';
import { AdminComponent } from './components/admin';

type Section = { id: number ; content: string | JSX.Element; };

const sectionsData: Section[] = [
  { id: 1, content: <ContentClima /> },
  { id: 2, content: <ContentRelatorios /> },
  { id: 3, content: <ContentEducation /> },
  { id: 4, content: <AdminComponent /> },
];

const App: React.FC = () => {
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const [backgroundClass, setBackgroundClass] = useState<string>('bg1');

  useEffect(() => {
    const currentHour = new Date().getHours();
    
    if (currentHour >= 6 && currentHour < 12) {
      setBackgroundClass('dia');
    } else if (currentHour >= 12 && currentHour < 18) {
      setBackgroundClass('tarde');
    } else {
      setBackgroundClass('noite');
    }
    }, []);

  const toggleSection = (id: number) => {
    setActiveSections((prevSections) =>
      prevSections.includes(id) ? [] : [id]
    );
  };

  return (
    <div className={`App ${backgroundClass}`}>
      <div className='topinho'>.</div>
      <Navbar sections={sectionsData} toggleSection={toggleSection}></Navbar>
      <Content className="content" sections={sectionsData} activeSections={activeSections} />
    </div>
  );
};

export default App;
