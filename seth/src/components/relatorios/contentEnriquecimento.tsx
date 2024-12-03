import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';


// Nova interface para os dados recebidos
interface DadoRecebido {
  cod_dados: number;
  cod_parametro: number;
  Valor: string;
  unixtime: number;
}


const GraficosPersonalizados: React.FC = () => {
  const [dados, setDados] = useState<DadoRecebido[]>([]);
  const [loading, setLoading] = useState(true);
  const [dadosPorEstado, setDadosPorEstado] = useState<Record<string, { x: number; Dados: number, nomenclatura: string}[]>>({});
  const [dadosPorUnidade, setDadosPorUnidade] = useState<Record<string, { x: number; Dados: number, nomenclatura: string }[]>>({});

  // Função para buscar os dados
  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await axios.get<DadoRecebido[]>(
        'https://seth-backend-app-652283507250.southamerica-east1.run.app/api/dados'
      );

      setDados(response.data);

      console.log('Dados carregados:', response.data);
    } catch (error) {
      console.error('Erro ao carregar os dados:', error);
    } finally {
      setLoading(false);
    }


  };
  useEffect(() => {
    fetchData();
  }, []);

  // Função para agrupar dados por estado
  const agruparPorEstado = () => {
    const dadosAgrupados: Record<string, { x: number; Dados: number, nomenclatura: string}[]> = {};

    dados.forEach((dado) => {
      const estado = `Estado ${dado.cod_parametro}`;



      if (!dadosAgrupados[estado]) {
        dadosAgrupados[estado] = [];
      }

      dadosAgrupados[estado].push({
        x: dado.unixtime,
        Dados: parseFloat(dado.Valor),
        nomenclatura: dado.cod_parametro.toString(),
      });
    });

    return dadosAgrupados;
  };

  const agruparPorUnidade = () => {
    const dadosAgrupados: Record<string, { x: number; Dados: number, nomenclatura: string}[]> = {};

    dados.forEach((dado) => {
      const unidade = `Unidade ${dado.cod_parametro}`;

      if (!dadosAgrupados[unidade]) {
        dadosAgrupados[unidade] = [];
      }

      dadosAgrupados[unidade].push({
        x: dado.unixtime,
        Dados: parseFloat(dado.Valor),
        nomenclatura: dado.cod_parametro.toString(),
      });
    });

    return dadosAgrupados;
  };




  useEffect(() => {

    if (!loading) {

      
      setDadosPorEstado(agruparPorEstado());
      setDadosPorUnidade(agruparPorUnidade());
    }
  }, [loading, dados]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h2>Gráficos por Estado</h2>
      {Object.entries(dadosPorEstado).length === 0 ? (
        <div>Nenhum dado disponível para exibir por estado.</div>
      ) : (
        Object.entries(dadosPorEstado).map(([estado, series], index) => (
          <div key={index} style={{ marginBottom: '2rem' }}>
            <h3>{estado}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={series}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" tickFormatter={(tick) => new Date(tick * 1000).toLocaleString()} />
                <YAxis
                />
                <Tooltip labelFormatter={(label) => new Date(label * 1000).toLocaleString()} />
                <Legend />
                <Line type="monotone" dataKey="Dados" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ))
      )}
      <h2>Gráficos por Unidade</h2>
      {Object.entries(dadosPorUnidade).length === 0 ? (
        <div>Nenhum dado disponível para exibir por unidade.</div>
      ) : (
        Object.entries(dadosPorUnidade).map(([unidade, series], index) => (
          <div key={index} style={{ marginBottom: '2rem' }}>
            <h3>
              {unidade}
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={series}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" tickFormatter={(tick) => new Date(tick * 1000).toLocaleString()} />
                <YAxis
                />
                <Tooltip labelFormatter={(label) => new Date(label * 1000).toLocaleString()} />
                <Legend />
                <Line type="monotone" dataKey="Dados" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ))
      )}
    </div>
  );
};

export default GraficosPersonalizados;
