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
import settingsIcon from './settings.png'
import './contentRelatorios.css'

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
  const [, setTiposParametros] = useState<TipoParametro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [startUnixTime, setStartUnixTime] = useState<number | null>(null);
  const [endUnixTime, setEndUnixTime] = useState<number | null>(null);
  const [isDateSelectionVisible, setIsDateSelectionVisible] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleClick = () => {
    setIsSpinning(true);
    setIsDateSelectionVisible(!isDateSelectionVisible);
  };

  
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
    return <div className='textoDashboards'>Carregando dados, por favor aguarde...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const groupedData = dados.reduce((acc, item) => {
    if (!acc[item.cod_parametro]) {
      acc[item.cod_parametro] = [];
    }
    acc[item.cod_parametro].push({ unixtime: item.unixtime, Valor: item.Valor });
    return acc;
  }, {} as Record<number, { unixtime: number; Valor: number }[]>);

  const getParametroNome = (index: number) => {
    return index % 2 === 0 ? 'Temperatura' : 'Umidade';
  };

  const getEstacaoNome = (index: number) => {
    const cycle = Math.floor(index / 2) % 3;
    return cycle === 0 ? 'Estação ABC' : cycle === 1 ? 'Estação DEF' : 'Estação GHI';
  };

  const convertToUnixTime = (dateString: string): number => {
    return Math.floor(new Date(dateString).getTime() / 1000);
  };

  const convertToDateTimeLocal = (unixTime: number | null): string => {
    return unixTime ? new Date(unixTime * 1000).toISOString().slice(0, 16) : '';
  };

  return (
    <div className='container'>
      <h1>Dados por Parâmetro</h1>
    <div>
      <img
        src= {settingsIcon}
        alt={isDateSelectionVisible ? 'Esconder Seleção de Data' : 'Mostrar Seleção de Data'}
        onClick={handleClick}
        onAnimationEnd={() => setIsSpinning(false)}
        className={isSpinning ? (isDateSelectionVisible ? 'spin-counterclockwise' : 'spin-clockwise') : ''}
        style={{ cursor: 'pointer', width: "50px", height: "50px", marginLeft: "2.5vw"}}
      />
      {isDateSelectionVisible && (
        <div className='caixacinza2'>
          <label htmlFor="startUnixTime">Data Inicial:</label>
          <input
            type="datetime-local"
            id="startUnixTime"
            value={convertToDateTimeLocal(startUnixTime)}
            onChange={e => {
              const unixTime = convertToUnixTime(e.target.value);
              setStartUnixTime(unixTime);
            }}
          />
          <br />
          <br />
          <label htmlFor="endUnixTime">Data Final:</label>
          <input
            type="datetime-local"
            id="endUnixTime"
            value={convertToDateTimeLocal(endUnixTime)}
            onChange={e => {
              const unixTime = convertToUnixTime(e.target.value);
              setEndUnixTime(unixTime);
            }}
          />
        </div>
      )}
      {Object.entries(groupedData)
        .filter(([cod_parametro]) => Number(cod_parametro))
        .map(([cod_parametro, values]) => {
          const filteredValues = values.filter(item => {
            return (
              (startUnixTime === null || item.unixtime >= startUnixTime) &&
              (endUnixTime === null || item.unixtime <= endUnixTime)
            );
          });

          const sortedValues = filteredValues.sort((a, b) => a.unixtime - b.unixtime);

          const formattedValues = sortedValues.map(item => ({
            ...item,
            unixtime: new Date(item.unixtime * 1000).toLocaleString('pt-BR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false,
            }),
          }));

          return (
            <div key={cod_parametro} className='caixacinza'>
              <div className='caixacinzaclaro'>
                <h2>Estação: {getEstacaoNome(Number(cod_parametro) - 1)}</h2>
                <h3>Parâmetro: {getParametroNome(Number(cod_parametro))}</h3>
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
    </div>
    </div>
  );
};

export default DataByCodParametro;
