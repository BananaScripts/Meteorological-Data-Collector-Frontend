import React, { useState, useEffect } from 'react';
import './contentEducation.css';
import media from './icons/media.png'
import medidas from './icons/medidas.png'
import porcentagem from './icons/porcentagem.png'
import regra from './icons/regra.png'
import Materia1 from './materias/materia1';
import Materia2 from './materias/materia2';
import Materia3 from './materias/materia3';
import Materia4 from './materias/materia4';

const ContentEducation: React.FC = () => {
    const [activeSection, setActiveSection] = useState<number | null>(null);
    const [completedSections, setCompletedSections] = useState<number[]>([]);
    const [showPopup, setShowPopup] = useState<boolean>(false);

    useEffect(() => {
        const storedCompletedSections = localStorage.getItem('completedSections');
        if (storedCompletedSections) {
            setCompletedSections(JSON.parse(storedCompletedSections));
        }
    }, []);

    const handleComplete = (section: number) => {
        if (!completedSections.includes(section)) {
            const newCompletedSections = [...completedSections, section];
            setCompletedSections(newCompletedSections);
            localStorage.setItem('completedSections', JSON.stringify(newCompletedSections));
        }
    };

    const handleBack = () => {
        setActiveSection(null);
    };

    const handleReset = () => {
        setCompletedSections([]);
        localStorage.removeItem('completedSections');
        setShowPopup(false);
    };

    const renderSection = () => {
        switch (activeSection) {
            case 1:
                handleComplete(1);
                return <Materia1 />;
            case 2:
                handleComplete(2);
                return <Materia2 />;
            case 3:
                handleComplete(3);
                return <Materia3 />;
            case 4:
                handleComplete(4);
                return <Materia4 />;
            default:
                return null;
        }
    };

    const totalSections = 4;
    const progressPercentage = (completedSections.length / totalSections) * 100;

    return (
        <div>
        <div className='caixacinza'>
            <div className='caixacinzaclaro'>
                <div className='EducationCss'>
                    <h1>Curso de Matemática Aplicada à Meteorologia</h1>

                    {activeSection === null ? (
                        <div className='secoes'>
                            <button
                                className={`secao-btn grande ${completedSections.includes(1) ? 'completed' : ''}`}
                                onClick={() => setActiveSection(1)}>
                                <img src={regra} alt="Regra de Três" />
                                <p>Regra de Três</p>
                            </button>
                            <button
                                className={`secao-btn grande ${completedSections.includes(2) ? 'completed' : ''}`}
                                onClick={() => setActiveSection(2)}>
                                <img src={porcentagem} alt="Porcentagem" />
                                <p>Porcentagem</p>
                            </button>
                            <button
                                className={`secao-btn grande ${completedSections.includes(3) ? 'completed' : ''}`}
                                onClick={() => setActiveSection(3)}>
                                <img src={medidas} alt="Unidades de Medida" />
                                <p>Unidades de Medida</p>
                            </button>
                            <button
                                className={`secao-btn grande ${completedSections.includes(4) ? 'completed' : ''}`}
                                onClick={() => setActiveSection(4)}>
                                <img src={media} alt="Média Aritmética" />
                                <p>Média Aritmética</p>
                            </button>
                        </div>
                    ) : (
                        <div className='conteudo-secao'>
                            {renderSection()}
                            <button className='secao-btn retorno' onClick={handleBack}>
                                Voltar à Seleção
                            </button>
                        </div>
                    )}

                    <div className='barra-progresso'>
                        <div className='progresso' style={{ width: `${progressPercentage}%` }} />
                    </div>
                    <p className='percentagem'>{Math.round(progressPercentage)}%</p>
                    
                    {activeSection === null && (
                        <button className='secao-btn reset' onClick={() => setShowPopup(true)}>
                            Resetar Progresso
                        </button>
                    )}

                    {showPopup && (
                        <div className='popup'>
                            <div className='popup-content'>
                                <h2>Confirmar Reset</h2>
                                <p>Tem certeza que deseja resetar o progresso?</p>
                                <button className='confirm' onClick={handleReset}>Sim</button>
                                <button className='cancel' onClick={() => setShowPopup(false)}>Não</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
        <div className="fundinho"></div>
    </div>
    );
};

export default ContentEducation;
