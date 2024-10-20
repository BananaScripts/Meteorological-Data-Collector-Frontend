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

const DataByParameter = () => {
  const [dados, setDados] = useState<DadosItem[]>([]);
  const [tiposParametros, setTiposParametros] = useState<TipoParametro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dadosResponse, tiposResponse] = await Promise.all([
          axios.get<DadosItem[]>('http://localhost:30105/api/dados'),
          axios.get<TipoParametro[]>('http://localhost:30105/api/tiposparametros'),
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

  // Agrupando dados por parâmetro
  const groupedData = dados.reduce((acc, item) => {
    const parametro = tiposParametros.find(param => param.cod_tipoParametro === item.cod_parametro);
    const parametroNome = parametro ? parametro.nome : 'Desconhecido';

    if (!acc[parametroNome]) {
      acc[parametroNome] = [];
    }

    acc[parametroNome].push({ unixtime: item.unixtime, Valor: item.Valor });
    return acc;
  }, {} as Record<string, { unixtime: number; Valor: number }[]>);

  return (
    <div>
      <h1>Dados por Parâmetro</h1>
      {Object.entries(groupedData).map(([parametroNome, values]) => {
        // Ordenando os dados pelo unixtime
        const sortedValues = values.sort((a, b) => a.unixtime - b.unixtime);
        
        // Convertendo unixtime para data legível
        const formattedValues = sortedValues.map(item => ({
          ...item,
          unixtime: new Date(item.unixtime * 1000).toLocaleString(), // Convertendo Unix time para formato legível
        }));

        return (
            <div>
    <div className='caixacinza'>
        <div className='caixacinzaclaro'>
          <div key={parametroNome}>
            <h2>{parametroNome}</h2>
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
    </div>

    </div>
        );
      })}
    </div>
  );
};

export default DataByParameter;
