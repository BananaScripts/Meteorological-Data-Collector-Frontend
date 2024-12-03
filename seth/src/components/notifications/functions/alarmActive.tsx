import React, { useEffect, useState } from 'react';
import './app.css';
import { Alarme } from '../../../types/alarme';
import { HistAlarme } from '../../../types/histAlarme';
import axios from 'axios';

const NotificationAlert: React.FC = () => {
  const [alarmes, setAlarmes] = useState<Array<Alarme>>([]);
  const [histAlarmes, setHistAlarmes] = useState<Array<HistAlarme>>([]);
  const [prevHistLength, setPrevHistLength] = useState(100);
  const [newAlarme, setNewAlarme] = useState<Alarme | null>(null);
  const [showPopup, setShowPopup] = useState(false);


  const noerro = ( histAlarmes && alarmes)
  if (!noerro) {
    console.log(noerro)
  }


  const fetchData = async () => {
    try {
      // Busca alarmes e histórico de alarmes
      const [alarmesResponse, histAlarmesResponse] = await Promise.all([
        axios.get('https://seth-backend-app-652283507250.southamerica-east1.run.app/api/alarmes'),
        axios.get('https://seth-backend-app-652283507250.southamerica-east1.run.app/api/histAlarmes'),
      ]);

      const currentAlarmes = alarmesResponse.data;
      const currentHistAlarmes = histAlarmesResponse.data;

      setAlarmes(currentAlarmes);



      // Verifica se houve mudanças no histórico
      if (currentHistAlarmes.length > prevHistLength) {
        const lastAlarme = currentHistAlarmes[currentHistAlarmes.length - 1];
        const correspondingAlarme = currentAlarmes.find(
          (alarme: Alarme) => alarme.cod_alarme === lastAlarme.cod_alarme
        );

        if (correspondingAlarme) {
          setNewAlarme(correspondingAlarme);
          setShowPopup(true);

          // Exibe o pop-up por 5 segundos
          setTimeout(() => {
            setShowPopup(false);
          }, 5000);
        }
      }


      // Atualiza o comprimento do histórico somente após verificar mudanças
      setPrevHistLength(currentHistAlarmes.length);
      setHistAlarmes(currentHistAlarmes);

    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
    }
  };

  useEffect(() => {
    fetchData();

    // Intervalo para atualizar a cada 15 segundos
    const interval = setInterval(fetchData, 15000);

    // Limpa o intervalo quando o componente for desmontado
    return () => clearInterval(interval);
  }, [prevHistLength]); // Dependência para verificar mudanças no comprimento do histórico

  return (
    <div>
      {showPopup && newAlarme ? (
        <div className="popup">
          <strong>ALARME DISPARADO!</strong>
          <hr />
          <h4>Nome do Alarme: {newAlarme?.nome}</h4>
        </div>
      ) : null}
    </div>
  );
};

export default NotificationAlert;
