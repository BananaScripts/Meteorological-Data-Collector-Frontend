import React, { useEffect, useState } from 'react';
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
import { Estacao } from '../../types/estacao';

interface DadosItem {
  cod_dados: number;
  cod_parametro: number;
  Valor: number;
  unixtime: number;
}

interface TipoParametro {
  cod_tipoParametro: number;
  nome: string;
  fator: string;
  offset: string;
  unidadeMedida: string;
  json: string;
}

const DataByCodParametro = () => {
  const [dados, setDados] = useState<DadosItem[]>([]);
  const [tiposParametros, setTiposParametros] = useState<TipoParametro[]>([]);
  const [estacoes, setEstacoes] = useState<Estacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dadosResponse, tiposResponse] = await Promise.all([
          axios.get<DadosItem[]>('http://localhost:30105/api/dados'),
          axios.get<TipoParametro[]>('http://localhost:30105/api/tiposparametros'),
          axios.get<Estacao[]>('http://localhost:30105/api/estacoes'),
        ]);

        setDados(dadosResponse.data);
        setTiposParametros(tiposResponse.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(`Erro ao buscar os dados: ${err.message}`);
        } else {
          setError('Erro inesperado ao buscar os dados');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Carregando dados, por favor aguarde...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Agrupar os dados pelo `cod_parametro`
  const groupedData = dados.reduce((acc, item) => {
    if (!acc[item.cod_parametro]) {
      acc[item.cod_parametro] = [];
    }

    acc[item.cod_parametro].push({ unixtime: item.unixtime, Valor: item.Valor });
    return acc;
  }, {} as Record<number, { unixtime: number; Valor: number }[]>);

  // Função auxiliar para encontrar o nome do parâmetro baseado no cod_parametro
    const getParametroNome = (index: number) => {
      return index % 2 === 0 ? 'Temperatura': 'Umidade';
    };
    
      // Função auxiliar para encontrar o nome do parâmetro baseado no cod_parametro
      const getEstacaoNome = (index: number) => {
        const cycle = Math.floor(index / 2) % 3;
        if (cycle === 0) {
          return 'Estação ABC';
        } else if (cycle === 1) {
          return 'Estação DEF';
        } else {
          return 'Estação GHI';
        }
      };
      

  return (
    <div>
      <h1>Dados por Parâmetro</h1>
      {Object.entries(groupedData)
        .filter(([cod_parametro]) => Number(cod_parametro) > 10) // Filtro para exibir apenas cod_parametro > 10
        .map(([cod_parametro, values]) => {
          const sortedValues = values.sort((a, b) => a.unixtime - b.unixtime);
          
          const formattedValues = sortedValues.map(item => ({
            ...item,
            unixtime: new Date(item.unixtime * 1000).toLocaleString(),
          }));


          return (
            <div className='caixacinza'>
            <div key={cod_parametro} className='caixacinzaclaro'>
              <h2>Estação: {getEstacaoNome(Number(cod_parametro)-1)}</h2> {/* Exibe o nome da estação */}
              <h3>Parâmetro: {getParametroNome(Number(cod_parametro))}</h3> {/* Exibe o nome do parâmetro */}
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={formattedValues}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="unixtime" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Valor" stroke="#8E1600" />
                </LineChart>
              </ResponsiveContainer>

              </div>

              
            </div>
          );
        })}
        <div className='fundinho'>.</div>
    </div>
          
  );
};

export default DataByCodParametro;
