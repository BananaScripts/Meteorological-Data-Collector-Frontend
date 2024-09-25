import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './contentRelatorios.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const ContentRelatorios: React.FC = () => {
        const shuffleArray = (array: number[]) => {
                for (let i = array.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [array[i], array[j]] = [array[j], array[i]];
                }
        };
        const temperatures = [5, 12, 18, 25, 30, 35];
        shuffleArray(temperatures);
        const labels = ['Jan', 'Feb', 'Mar', 'Abr', 'Mai', 'Jun'];


        const createGradient = (ctx: CanvasRenderingContext2D, area: {left: number, right: number}) => {
                const gradient = ctx.createLinearGradient(area.left, 0, area.right, 0);
                gradient.addColorStop(0, 'blue');
                gradient.addColorStop(0.33, 'green');
                gradient.addColorStop(0.66, 'orange');
                gradient.addColorStop(1, 'red');
                return gradient;
        };

        const data = {
                labels: labels,
                datasets: [
                        {
                                label: 'Temperatura (°C)',
                                data: temperatures,
                                borderColor: (context: any) => {
                                        const chart = context.chart;
                                        const { ctx, chartArea } = chart;
                                        if (!chartArea) {
                                                return 'rgba(0,0,0,0)';}
                                        return createGradient(ctx, chartArea);},
                                borderWidth: 3,
                                fill: false,
                                tension: 0.4,
                                pointBackgroundColor: temperatures.map(temp => {
                                        if (temp <= 0) return 'blue';
                                        if (temp <= 15) return 'green';
                                        if (temp <= 30) return 'orange';
                                        return 'red';}),
                                pointRadius: 5}]};
        const options = {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                        y: {
                                beginAtZero: true
                        }
                }
        };
        return (
                <div>
                        <div className='caixacinza'>
                                <div className='caixacinzaclaro'>
                                        <h1>Página de Relatórios</h1>
                                        <p>Página placeholder para o sistema de relatórios.</p>
                                        <div className='grafico-container'>
                                                <Line data={data} options={options} />
                                        </div>
                                </div>
                        </div>
                        <div className="fundinho">.</div>
                </div>
        );
};

export default ContentRelatorios;
