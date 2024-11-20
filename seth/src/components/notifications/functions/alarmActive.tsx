import React, { useEffect, useState } from 'react';
import './app.css';
import axios from 'axios';
import { Alarme } from '../../../types/alarme';
import { HistAlarme } from '../../../types/histAlarme';
import atualizarAlarmes from './updateAlarms';

const NotificationAlert: React.FC = () => {
    const [alarmes, setAlarmes] = useState<Array<Alarme>>([]);
    const [histAlarmes, setHistAlarmes] = useState<Array<HistAlarme>>([]);
    const [prevLength, setPrevLength] = useState(0);
    const [newAlarme, setNewAlarme] = useState<Alarme | null>(null);
    const [showPopup, setShowPopup] = useState(false);

    // useEffect para buscar dados iniciais
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { histAlarmes, alarmes } = await atualizarAlarmes();
                setHistAlarmes(histAlarmes);
                setAlarmes(alarmes);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };
        fetchData();
    }, []);

    // useEffect para monitorar mudanças em histAlarmes
    useEffect(() => {
        if (histAlarmes.length > prevLength) {
            const novoAlarme = alarmes.find(
                (alarme) => alarme.cod_alarme === histAlarmes[histAlarmes.length - 1]?.cod_alarme
            );
            setNewAlarme(novoAlarme || null);
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 10000);
        }
        setPrevLength(histAlarmes.length);
    }, [histAlarmes, alarmes]);

    return (
        <div>
            {showPopup && newAlarme ? (
                <div className="popup">
                    <strong>ALARME DISPARADO!</strong>
                    <hr />
                    <h4>Nome do Alarme: {newAlarme.nome}</h4>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
};

export default NotificationAlert;
