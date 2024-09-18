import React, { useState } from 'react';
import './App.css';
import Navbar from './components/home/Navbarapp';
import Content from './components/home/contentHome';
import ContentClima from './components/clima/contentClima';
import ContentEducation from './components/education/contentEducation';
import ContentRelatorios from './components/relatorios/contentRelatorios';
import { AdminComponent } from './components/admin';

type Section = { id: number ; content: string | JSX.Element; };


const sectionsData: Section[] = [
  { id: 1, content: <ContentClima /> },
  { id: 2, content: <ContentRelatorios /> },
  { id: 3, content: <ContentEducation /> },
  { id: 4, content: <AdminComponent /> }
];

  const App: React.FC = () => {
    const [activeSections, setActiveSections] = useState<number[]>([]);
    const [backgroundClass, setBackgroundClass] = useState<string>('bg1');

    const toggleSection = (id: number) => {
      setActiveSections((prevSections) =>
      prevSections.includes(id) ? [] : [id]
      );
    };
    const changeBackground = (bgClass: string) => {
      setBackgroundClass(bgClass);
    };
  
    return (
      <div className={`App ${backgroundClass}`}>
        <div className='topinho'>.</div>
        <Navbar sections={sectionsData} toggleSection={toggleSection} />
        <Content className="content" sections={sectionsData} activeSections={activeSections} />
        <div className="background-buttons">
          <button onClick={() => changeBackground('bg1')}>Fundo 1</button>
          <button onClick={() => changeBackground('bg2')}>Fundo 2</button>
          <button onClick={() => changeBackground('bg3')}>Fundo 3</button>
        </div>
      </div>
    );
};

export default App;

