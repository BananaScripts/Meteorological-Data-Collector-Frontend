import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { listarEstacoes, buscarEstacaoPorCodigo, Estacao, EstacaoData } from './apiSimulada'; // Supondo que você tenha essas funções
import './contentRelatorios.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ContentRelatorios: React.FC = () => {
    const [estacoes, setEstacoes] = useState<Estacao[]>([]);
    const [dados, setDados] = useState<EstacaoData[]>([]);
    const [selectedEstacao, setSelectedEstacao] = useState<string>('');

    useEffect(() => {
        listarEstacoes().then(response => setEstacoes(response));
    }, []);

    useEffect(() => {
        if (selectedEstacao) {
            buscarEstacaoPorCodigo(selectedEstacao).then(response => setDados(response));
        } else {
            setDados([]);
        }
    }, [selectedEstacao]);

    // Funções para gerar gradientes de cores
    const getTemperatureColor = (temperatura: number) => {
        const red = Math.min(255, Math.max(0, Math.floor((temperatura - 15) * 12.75)));
        const blue = Math.min(255, Math.max(0, Math.floor((30 - temperatura) * 12.75)));
        return `rgba(${red}, 0, ${blue}, 1)`;
    };

    const getHumidityColor = (humidity: number) => {
        const lightBlue = 100 + Math.min(155, Math.floor(humidity * 1.55));
        return `rgba(0, ${lightBlue}, 255, 1)`; // Gradiente azul claro a azul escuro
    };

    const getWindSpeedColor = (speed: number) => {
        const green = Math.min(255, Math.max(0, Math.floor(speed * 12.75)));
        return `rgba(0, ${green}, 0, 1)`; // Gradiente de verde para indicar velocidade do vento
    };

    // Definir os dados do gráfico com base no tipo de parâmetro
    const getChartData = (label: string, data: number[], colorFunction: (value: number) => string) => ({
        labels: dados.map(item => item.dataMedicao),
        datasets: [
            {
                label,
                data,
                borderColor: data.map(item => colorFunction(item)),
                backgroundColor: data.map(item => colorFunction(item)),
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 5,
            },
        ],
    });

    // Configuração genérica dos gráficos
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: false,
                title: { display: true },
            },
            x: {
                title: { display: true, text: 'Data' },
            },
        },
    };

    return (
        <div>
            <div className='caixacinza'>
                <div className='caixacinzaclaro'>
                    <h1>Página de Relatórios</h1>
                    <p>Página placeholder para o sistema de relatórios.</p>

                    {/* Dropdown para seleção de estação */}
                    <select onChange={(e) => setSelectedEstacao(e.target.value)} value={selectedEstacao}>
                        <option value="">Selecione uma estação</option>
                        {estacoes.map(estacao => (
                            <option key={estacao.cod_estacao} value={estacao.cod_estacao}>
                                {estacao.nome}
                            </option>
                        ))}
                    </select>

                    {/* Renderização dos gráficos */}
                    {dados.length > 0 && (
                        <div className='grafico-container'>
                            <div className='grafico'>
                                <Line
                                    data={getChartData('Temperatura (°C)', dados.map(item => item.temperatura), getTemperatureColor)}
                                    options={{ ...chartOptions, scales: { ...chartOptions.scales, y: { ...chartOptions.scales.y, title: { text: 'Temperatura (°C)' } } } }}
                                />
                            </div>

                            {/* Exemplo para outro parâmetro, como umidade */}
                            <div className='grafico'>
                                <Line
                                    data={getChartData('Umidade (%)', dados.map(item => item.umidade), getHumidityColor)}
                                    options={{ ...chartOptions, scales: { ...chartOptions.scales, y: { ...chartOptions.scales.y, title: { text: 'Umidade (%)' } } } }}
                                />
                            </div>

                            {/* Exemplo para velocidade do vento */}
                            <div className='grafico'>
                                <Line
                                    data={getChartData('Velocidade do Vento (km/h)', dados.map(item => item.velocidadeVento), getWindSpeedColor)}
                                    options={{ ...chartOptions, scales: { ...chartOptions.scales, y: { ...chartOptions.scales.y, title: { text: 'Velocidade do Vento (km/h)' } } } }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className='fundinho'>.</div>
        </div>
    );
};

export default ContentRelatorios;
