import React, { useState } from 'react';
import './App.css';
import  Navbar  from './components/home/Navbarapp';
import Content from './components/home/contentHome';
/*import ContentClima from './components/clima/contentClima';*/
import ContentEducation from './components/education/contentEducation';
import ContentRelatorios from './components/relatorios/contentRelatorios';
import ContentLogin from './components/login/contentLogin';
import { AdminComponent } from './components/admin';

type Section = { id: number; name: string; icon: string; content: string | JSX.Element; };

const sectionsData: Section[] = [
  /*{ id: 1, name: 'Clima', icon: 'clima-icon', content: <ContentClima /> },*/
  { id: 2, name: 'Relatórios', icon: './components/home/icons/relatorios.png', content: <ContentRelatorios /> },
  { id: 3, name: 'Educação', icon: './components/home/icons/educacao.png', content: <ContentEducation /> },
  { id: 4, name: 'Administrador', icon: './components/home/icons/admin.png', content: <AdminComponent /> },
];

const App: React.FC = () => {
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const [, setIsLoginOpen] = useState(false);


  const toggleSection = (id: number | null) => {
        if (id === null) return;
        setActiveSections((prevSections) =>
          prevSections.includes(id) ? [] : [id]
        );
  };

  const closeOtherComponents = () => {
    setIsLoginOpen(true); // Marca que o login está aberto
  };

  return (
    <div className={`App`}>
      <div className='topinho'>.</div>
      <Navbar sections={sectionsData} toggleSection={toggleSection}></Navbar>
      <Content className="content" sections={sectionsData} activeSections={activeSections} />
      <ContentLogin onCloseOtherComponents={closeOtherComponents} />
    </div>
  );
};

export default App;
