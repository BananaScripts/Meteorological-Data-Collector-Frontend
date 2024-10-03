import React, { useState, useEffect } from 'react';
import './contentEducation.css';
import Materia1 from './materias/grupo1/materia1';
import Materia2 from './materias/grupo1/materia2';
import Materia3 from './materias/grupo1/materia3';
import Materia4 from './materias/grupo1/materia4';
import Materia5 from './materias/grupo2/materia5';
import Materia6 from './materias/grupo2/materia6';
import Materia7 from './materias/grupo2/materia7';
import Materia8 from './materias/grupo2/materia8';
import Materia9 from './materias/grupo3/materia9';
import Materia10 from './materias/grupo3/materia10';
import Materia11 from './materias/grupo3/materia11';
import Materia12 from './materias/grupo3/materia12';

import statisticsImage from './icons/media.png';
import functionsImage from './icons/medidas.png';
import modelingImage from './icons/porcentagem.png';
import calculusImage from './icons/regra.png';
import derivativesImage from './icons/derivatives.png';
import deviationImage from './icons/deviation.png';
import equationImage from './icons/equation.png';
import graphImage from './icons/graph-report.png';
import integralImage from './icons/integral.png';
import limitImage from './icons/limit.png';
import progressImage from './icons/progress-report.png';
import taxacrescimentoImage from './icons/taxascrescimento.png';

const ContentEducation: React.FC = () => {
    const [activeSection, setActiveSection] = useState<number | null>(null);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [completedSections, setCompletedSections] = useState<number[]>(() => {
        const storedProgress = localStorage.getItem('completedSections');
        return storedProgress ? JSON.parse(storedProgress) : [];
    });
    const [unlockedSections, setUnlockedSections] = useState<number[]>([1, 2, 3, 4]);

    const materias = [
        { id: 1, title: 'Regra de Três', image: statisticsImage, component: <Materia1 /> },
        { id: 2, title: 'Porcentagem', image: functionsImage, component: <Materia2 /> },
        { id: 3, title: 'Unidades de Medida', image: modelingImage, component: <Materia3 /> },
        { id: 4, title: 'Média Aritmética', image: calculusImage, component: <Materia4 /> },
        { id: 5, title: 'Desvio Padrão', image: deviationImage, component: <Materia5 /> },
        { id: 6, title: 'Progressões', image: progressImage, component: <Materia6 /> },
        { id: 7, title: 'Taxas de Crescimento', image: taxacrescimentoImage, component: <Materia7 /> },
        { id: 8, title: 'Equações Lineares', image: equationImage, component: <Materia8 /> },
        { id: 9, title: 'Gráficos', image: graphImage, component: <Materia9 /> },
        { id: 10, title: 'Limites', image: limitImage, component: <Materia10 /> },
        { id: 11, title: 'Integrais', image: integralImage, component: <Materia11 /> },
        { id: 12, title: 'Derivadas', image: derivativesImage, component: <Materia12 /> },
    ];

    const handleComplete = (section: number) => {
        if (!completedSections.includes(section)) {
            const updatedSections = [...completedSections, section];
            setCompletedSections(updatedSections);
            localStorage.setItem('completedSections', JSON.stringify(updatedSections));
        }
    };

    const handleBack = () => {
        setActiveSection(null);
    };

    const calculateGroupProgress = (start: number, end: number) => {
        const completedInGroup = completedSections.filter(section => section >= start && section <= end).length;
        const groupSize = end - start + 1;
        return Math.round((completedInGroup / groupSize) * 100);
    };

    useEffect(() => {
        const numCompleted = completedSections.length;

    if (numCompleted >= 8) {
        setUnlockedSections([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    } else if (numCompleted >= 4) {
        setUnlockedSections([1, 2, 3, 4, 5, 6, 7, 8]);
    } else {
        setUnlockedSections([1, 2, 3, 4]);
    }
}, [completedSections]);
    const overallProgress = Math.round((completedSections.length / materias.length) * 100);

    const handleResetProgress = () => {
        setCompletedSections([]);
        setUnlockedSections([1, 2, 3, 4]);
        localStorage.removeItem('completedSections');
        setShowPopup(false);
    };

    const renderSection = () => {
        const selectedMateria = materias.find((m) => m.id === activeSection);
        if (selectedMateria) {
            handleComplete(selectedMateria.id);
            return selectedMateria.component;
        }
        return null;
    };

    const renderProgress = (group: number[]) => {
        const completedInGroup = group.filter(id => completedSections.includes(id)).length;
        const groupProgress = Math.round((completedInGroup / group.length) * 100);
        return (
            <div className='barra-progresso'>
                <div className='progresso' style={{ width: `${groupProgress}%` }}>
                    <p className='porcentagem'>{groupProgress}%</p>
                </div>
            </div>
        );
    };

    const renderGroup = (start: number, end: number) => {
        const groupMaterias = materias.filter(materia => materia.id >= start && materia.id <= end);
        const groupProgress = calculateGroupProgress(start, end);
    
        return (
            <div>
                <div className='secoes'>
                    {groupMaterias.map(materia => (
                        <button
                            key={materia.id}
                            className={`secao-btn grande ${completedSections.includes(materia.id) ? 'completed' : ''}`}
                            onClick={() => setActiveSection(materia.id)}
                        >
                            <img src={materia.image} alt={materia.title} />
                            <p>{materia.title}</p>
                        </button>
                    ))}
                </div>
                {/* Exibir a barra de progresso do grupo */}
                <div className='barra-progresso'>
                    <div className='progresso' style={{ width: `${groupProgress}%` }}>
                        <p className='porcentagem'>{groupProgress}%</p>
                    </div>
                </div>
            </div>
        );
    };
    
    const groups = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
    ];

    return (
        <div>
        <div className='caixacinza'>
            <div className='caixacinzaclaro'>
                <div className='EducationCss'>
                    <h1>Curso de Matemática Aplicada à Meteorologia</h1>
    
                    {activeSection === null ? (
                        <div>
                            {/* Renderizando os grupos desbloqueados */}
                            {unlockedSections.includes(4) && renderGroup(1, 4)}
                            {unlockedSections.includes(8) && renderGroup(5, 8)}
                            {unlockedSections.includes(12) && renderGroup(9, 12)}
    
                            {/* Barra de progresso geral */}
                            <div className='barra-progresso geral'>
                                <div className='progresso-total' style={{ width: `${overallProgress}%` }}>
                                    <p className='porcentagem'>{overallProgress}%</p>
                                </div>
                            </div>
    
                            {/* Botão de reset */}
                            <button className='secao-btn reset' onClick={() => setShowPopup(true)}>
                                Resetar Progresso
                            </button>
    
                            {/* Popup de confirmação de reset */}
                            {showPopup && (
                                <div className='popup'>
                                    <div className='popup-content'>
                                        <h2>Confirmar Reset</h2>
                                        <p>Tem certeza que deseja resetar o progresso?</p>
                                        <button className='confirm' onClick={handleResetProgress}>Sim</button>
                                        <button className='cancel' onClick={() => setShowPopup(false)}>Não</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className='conteudo-secao'>
                            {renderSection()}
                            <button className='secao-btn retorno' onClick={handleBack}>
                                Voltar à Seleção
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
        <div className='fundinho'>.</div>
        </div>
    );
};

export default ContentEducation;
