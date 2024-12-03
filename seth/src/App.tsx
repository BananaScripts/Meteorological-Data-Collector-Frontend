import React, { useState } from 'react';
import './App.css';
import Navbar from './components/home/Navbarapp';
import Content from './components/home/contentHome';
import ContentEducation from './components/education/contentEducation';
import ContentLogin from './components/login/contentLogin';
import { AdminComponent } from './components/admin';
import NotificationsBar from './components/notifications/app';
import NotificationAlert from './components/notifications/functions/alarmActive';
import { useAuth } from './components/login/AuthContext'; // Ajuste o caminho para onde está definido o AuthProvider e useAuth.
import Relatorios from './components/relatorios/main';

type Section = { id: number; name: string; icon: string; content: string | JSX.Element };

const sectionsData: Section[] = [
  { id: 2, name: 'Relatórios', icon: './components/home/icons/relatorios.png', content: <Relatorios/> },
  { id: 3, name: 'Educação', icon: './components/home/icons/educacao.png', content: <ContentEducation /> },
];

const adminSection: Section = {
  id: 4,
  name: 'Administrador',
  icon: './components/home/icons/admin.png',
  content: <AdminComponent />,
};

const App: React.FC = () => {
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const [, setIsLoginOpen] = useState(false);
  const { user } = useAuth(); // Obtemos o estado do usuário autenticado.

  const toggleSection = (id: number | null) => {
    if (id === null) return;
    setActiveSections((prevSections) =>
      prevSections.includes(id) ? [] : [id]
    );
  };

  const closeOtherComponents = () => {
    setIsLoginOpen(true); // Marca que o login está aberto
  };

  // Incluímos a seção "Administrador" apenas se o usuário estiver autenticado.
  const visibleSections = user ? [...sectionsData, adminSection] : sectionsData;

  return (
    <div className={`App`}>
      <NotificationAlert />
      <NotificationsBar />
      <div className="topinho">.</div>
      <Navbar sections={visibleSections} toggleSection={toggleSection}></Navbar>
      <Content className="content" sections={visibleSections} activeSections={activeSections} />
      <ContentLogin onCloseOtherComponents={closeOtherComponents} />
    </div>
  );
};

export default App;
