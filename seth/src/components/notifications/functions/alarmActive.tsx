import React, { useEffect, useState } from 'react';
import "./app.css";
import { Alarme } from '../../../types/alarme';
import axios from 'axios';
import { HistAlarme } from '../../../types/histAlarme';

const NotificationAlert: React.FC = () => {
    const [alarmes, setAlarmes] = useState<Array<Alarme>>([]);
    const [histAlarmes, setHistAlarmes] = useState<Array<HistAlarme>>([]);
    const [prevLength, setPrevLength] = useState(100);
    const [newAlarme, setNewAlarme] = useState<Alarme | null>(null);
    const [showPopup, setShowPopup] = useState(false);

    // Função para buscar alarmes do backend
    const atualizarAlarmes = () => {
        axios.get('http://localhost:30105/api/histAlarmes')
            .then((response) => {
                setHistAlarmes(response.data);

                setPrevLength(histAlarmes.length);

            })
            .catch((error) => {
                console.error("Erro ao buscar dados dos alarmes:", error);
            });

        axios.get('http://localhost:30105/api/alarmes')
            .then((response) => {
                setAlarmes(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar dados dos alarmes:", error);
            });

    };


    // useEffect para monitorar mudanças no tamanho de `alarmes`
    useEffect(() => {

        if (histAlarmes.length > prevLength) {

            const novoAlarme = alarmes.find((alarme) => alarme.cod_alarme === histAlarmes[histAlarmes.length - 1].cod_alarme);

            console.log(novoAlarme);
            setNewAlarme(novoAlarme || null);
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 10000); // Esconde o popup após 10 segundos
        }
        
        atualizarAlarmes();

    }, [alarmes]);


    return (
        <div>
            {showPopup && newAlarme && (
                <div className="popup">
                    
                    ALARME DISPARADO!

                    <hr />

                    <h4>Nome do Alarme: {newAlarme.nome}</h4>
                </div>
            )}
        </div>
    );
};

export default NotificationAlert;
