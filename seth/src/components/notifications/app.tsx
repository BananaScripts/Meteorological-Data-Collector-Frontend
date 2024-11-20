import React, { useEffect, useState } from 'react';
import "./app.css"
import { Alarme } from '../../types/alarme';
import axios from 'axios';
import NotificationHist from './functions/alarmHist';


const NotificationsBar: React.FC = () => {
    const [alarmes, setAlarmes] = useState<Array<Alarme>>([]);
    const [acionados] = useState<Alarme[]>([]);
    const [ativosMonitorados, setAtivosMonitorados] = useState(0);
    const [seeMore, setSeeMore] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
        setSeeMore(!seeMore);
    };
  
    // Função para buscar alarmes do backend
    const atualizarAlarmes = () => {
      axios.get('http://localhost:30105/api/alarmes')
        .then((response) => {
          setAlarmes(response.data); 
        })
        .catch((error) => {
          console.error("Erro ao buscar dados dos alarmes:", error);
        });


    };
  
    // Função para buscar quantidade de ativos monitorados
    const atualizarAtivosMonitorados = () => {
      axios.get('http://localhost:30105/api/ativosMonitorados')
        .then((response) => {
          setAtivosMonitorados(response.data.quantidade); 
        })
        .catch((error) => {
          console.error("Erro ao buscar dados dos ativos monitorados:", error);
        });
    };
  
    // useEffect para buscar alarmes e ativos monitorados ao montar o componente
    useEffect(() => {
      atualizarAlarmes();
      atualizarAtivosMonitorados();
    }, []); // Executa apenas uma vez, ao montar o componente
  
    
  console.log (alarmes)
  console.log(ativosMonitorados)

  return (
    <>
   
    <div id="Notifications" className={isExpanded ? "expanded" : ""}>

      <div id= "NotificationBar">

        <div id="ConfigAlarms">
            <p id='StatusConfig' />
            <h3>- Alarmes Configurados: {alarmes.length} </h3>
      
          </div>
      
        <div id="ExpiredAlarms">
            <p id='StatusExpired' />
            <h3>- Alarmes Ativados: {acionados.length} </h3>
      
        </div>
    
        <div id='SeeMore'>

            <button onClick={toggleExpand}><b>{seeMore ? 'Ver Menos \\/' : 'Ver Mais /\\'}</b></button>

        </div>

      </div>

      {seeMore && <NotificationHist alarmes={alarmes} acionados={acionados} />}
        
    </div>


    </>
  );
};

export default NotificationsBar;
