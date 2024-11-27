import React, { useEffect, useRef } from 'react';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Title,
  Tooltip,
} from 'chart.js';
import { Alarme } from '../../../types/alarme'; // Importe o tipo Alarme

// Registra os componentes necessários do Chart.js
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Legend, Title, Tooltip);

interface NotificationHistProps {
  alarmes: Alarme[]; // Substituído o tipo any por Alarme[]
  acionados: Alarme[]; // Substituído o tipo any por Alarme[]
}

const NotificationHist: React.FC<NotificationHistProps> = ({ alarmes, acionados }) => {
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    const ctx = document.getElementById('alarmeChart') as HTMLCanvasElement;

    // Destroi o gráfico anterior se existir
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Cria um novo gráfico
    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Criados', 'Ativados'],
        datasets: [
          {
            label: 'Quantidade',
            data: [alarmes.length, acionados.length],
            backgroundColor: ['#4caf50', '#f44336'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      },
    });

    // Cleanup para quando o componente desmontar
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [alarmes, acionados]);

  return (
    <div id="SeeMoreContent">
      <canvas id="alarmeChart" width="400" height="200"></canvas>
      <div id="tables">
        <div>
          <h3>Alarmes Criados</h3>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Condição</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {alarmes.map((alarme, index) => (
                <tr key={index}>
                  <td>{alarme.nome}</td>
                  <td>{alarme.condicao}</td>
                  <td>{alarme.valor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h3>Alarmes Ativados</h3>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {acionados.map((alarme, index) => (
                <tr key={index}>
                  <td>{alarme.nome}</td>
                  <td>{alarme.valor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NotificationHist;

