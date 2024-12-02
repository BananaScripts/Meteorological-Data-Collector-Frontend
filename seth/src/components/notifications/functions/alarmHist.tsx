import React, { useEffect, useRef, useState } from 'react';
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
import axios from 'axios';
import { Alarme } from '../../../types/alarme';
import { HistAlarme } from '../../../types/histAlarme';
import { tipoParametro } from '../../../types/tipoParametro';

// Registra os componentes necessários do Chart.js
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Legend, Title, Tooltip);

interface NotificationHistProps {
  alarmes: Alarme[];
  acionados: HistAlarme[];
}

const NotificationHist: React.FC<NotificationHistProps> = ({ alarmes, acionados }) => {
  const chartRef = useRef<Chart | null>(null);
  const [tiposParametros, setTiposParametros] = useState<tipoParametro[]>([]);

  // Função para buscar os tipos de parâmetros
  const fetchTiposParametros = async () => {
    try {
      const response = await axios.get('https://seth-backend-app-652283507250.southamerica-east1.run.app/api/tiposParametros');
      setTiposParametros(response.data);
    } catch (error) {
      console.error('Erro ao buscar tipos de parâmetros:', error);
    }
  };

  // useEffect para buscar os tipos de parâmetros ao montar o componente
  useEffect(() => {
    fetchTiposParametros();
  });

  // useEffect para inicializar o gráfico
  useEffect(() => {
    const ctx = document.getElementById('alarmeChart') as HTMLCanvasElement;

    // Inicializa o gráfico apenas uma vez
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

    // Cleanup ao desmontar o componente
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }); // Executa apenas uma vez ao montar o componente

  // Atualiza os dados do gráfico
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.data.datasets[0].data = [alarmes.length, acionados.length];
      chartRef.current.update();
    }
  }, [alarmes, acionados]); // Atualiza somente quando os valores mudam

  // Função para buscar o nome do parâmetro pelo código do parâmetro
  const getNomeParametro = (cod_parametro: number) => {
    const parametro = tiposParametros.find((tipo) => tipo.cod_tipoParametro === cod_parametro);
    return parametro ? parametro.nome : 'Desconhecido';
  };

  return (
    <div id="SeeMoreContent">
      <canvas id="alarmeChart" width="400" height="200"></canvas>
      <div id="tables">
        <div>
          <h3>Alarmes Criados</h3>
          <table>
            <thead>
              <tr>
                <th>Número do Alarme</th>
                <th>Nome</th>
                <th>Condição</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {alarmes.map((alarme, index) => (
                <tr key={index}>
                  <td>{alarme.cod_alarme}</td>
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
                <th>Alarme</th>
                <th>Parâmetro</th>
                <th>Valor</th>
                <th>Momento</th>
              </tr>
            </thead>
            <tbody>
              {acionados.map((alarme, index) => (
                <tr key={index}>
                  <td>{alarme.cod_alarme}</td>
                  <td>{getNomeParametro(alarme.cod_alarme)}</td>
                  <td>{alarme.valor}</td>
                  <td>{new Date(alarme.unixtime * 1000).toLocaleString()}</td>
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
