import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
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
import settingsIcon from './settings.png';
import './contentRelatorios.css';

interface DadosItem {
  cod_dados: number;
  cod_parametro: number;
  Valor: number;
  unixtime: number;
  cod_estacao: number;
}

interface TipoParametro {
  cod_tipoParametro: number;
  nome: string;
}

interface Estacao {
  cod_estacao: number;
  nome: string;
}

interface Parametro {
  cod_parametro: number;
  cod_estacao: number;
  cod_tipoParametro: number;
}

const DataByCodParametro: React.FC = () => {
  const [dados, setDados] = useState<DadosItem[]>([]);
  const [tiposParametros, setTiposParametros] = useState<TipoParametro[]>([]);
  const [estacoes, setEstacoes] = useState<Estacao[]>([]);
  const [parametros, setParametros] = useState<Parametro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [startUnixTime, setStartUnixTime] = useState<number | null>(null);
  const [endUnixTime, setEndUnixTime] = useState<number | null>(null);
  const [isDateSelectionVisible, setIsDateSelectionVisible] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedStation, setSelectedStation] = useState<number | null>(null);
  const [selectedParameter, setSelectedParameter] = useState<number | null>(null);

  const handleClick = () => {
    setIsSpinning(true);
    setIsDateSelectionVisible(!isDateSelectionVisible);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dadosResponse, tiposResponse, estacoesResponse, parametrosResponse] = await Promise.all([
          axios.get<DadosItem[]>('http://localhost:30105/api/dados'),
          axios.get<TipoParametro[]>('http://localhost:30105/api/tiposparametros'),
          axios.get<Estacao[]>('http://localhost:30105/api/estacoes'),
          axios.get<Parametro[]>('http://localhost:30105/api/parametros'),
        ]);

        setDados(dadosResponse.data);
        setTiposParametros(tiposResponse.data);
        setEstacoes(estacoesResponse.data);
        setParametros(parametrosResponse.data);
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

  const getParametroNome = (cod_tipoParametro: number): string => {
    const parametro = tiposParametros.find(param => param.cod_tipoParametro === cod_tipoParametro);
    if (!parametro) {
      console.log(`Parametro desconhecido: ${cod_tipoParametro}`);
      console.log('Available Parametros:', tiposParametros);
    }
    return parametro ? parametro.nome : 'Desconhecido';
  };

  const getEstacaoNome = (cod_estacao: number): string => {
    const estacao = estacoes.find(est => est.cod_estacao === cod_estacao);
    return estacao ? estacao.nome : 'Desconhecido';
  };

  const filterData = () => {
    return dados.filter(item => {
      const parametro = parametros.find(param => param.cod_parametro === item.cod_parametro);
      if (!parametro) return false;

      const { cod_estacao, cod_tipoParametro } = parametro;

      const isStationMatch = selectedStation === null || cod_estacao === selectedStation;
      const isParameterMatch = selectedParameter === null || cod_tipoParametro === selectedParameter;
      const isDateMatch =
        (startUnixTime === null || item.unixtime >= startUnixTime) &&
        (endUnixTime === null || item.unixtime <= endUnixTime);

      return isStationMatch && isParameterMatch && isDateMatch;
    }).map(item => {
      const parametro = parametros.find(param => param.cod_parametro === item.cod_parametro);
      const estacaoNome = parametro ? getEstacaoNome(parametro.cod_estacao) : 'Desconhecido';
      const parametroNome = parametro ? getParametroNome(parametro.cod_tipoParametro) : 'Desconhecido';
      const date = new Date(item.unixtime * 1000).toLocaleString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });

      return {
        ...item,
        estacao: estacaoNome,
        parametro: parametroNome,
        data: date,
      };
    });
  };

  const downloadDataAsJson = () => {
    const filteredData = filterData();
    const json = JSON.stringify(filteredData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'filtered_data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportDataAsPdf = () => {
    const filteredData = filterData();
    const doc = new jsPDF();
  
    doc.setFontSize(9);
    doc.text('Dados Filtrados', 10, 10);
  
    let y = 20;
    filteredData.forEach((item, index) => {
      if (y > 280) { // Check if the y position is beyond the page height
        doc.addPage();
        y = 20; // Reset y position for the new page
      }
      doc.text(`Estação: ${item.estacao}`, 10, y);
      doc.text(`Parâmetro: ${item.parametro}`, 60, y);
      doc.text(`Data: ${item.data}`, 110, y);
      doc.text(`Valor: ${item.Valor}`, 160, y);
      y += 10; // Increment y position for the next line
    });
  
    doc.save('filtered_data.pdf');
  };

  if (loading) {
    return <div className='textoDashboards'>Carregando dados, por favor aguarde...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const groupedData = dados.reduce((acc, item) => {
    const { cod_parametro } = item;
    const parametro = parametros.find(param => param.cod_parametro === cod_parametro);
    if (!parametro) return acc;

    const { cod_estacao, cod_tipoParametro } = parametro;

    if (!acc[cod_tipoParametro]) {
      acc[cod_tipoParametro] = {};
    }
    if (!acc[cod_tipoParametro][cod_estacao]) {
      acc[cod_tipoParametro][cod_estacao] = [];
    }
    acc[cod_tipoParametro][cod_estacao].push(item);
    return acc;
  }, {} as Record<number, Record<number, DadosItem[]>>);

  return (
    <div className='container'>
      <h1>Dados por Parâmetro</h1>
      <div>
        <img
          src={settingsIcon}
          alt={isDateSelectionVisible ? 'Esconder Seleção de Data' : 'Mostrar Seleção de Data'}
          onClick={handleClick}
          onAnimationEnd={() => setIsSpinning(false)}
          className={isSpinning ? (isDateSelectionVisible ? 'spin-counterclockwise' : 'spin-clockwise') : ''}
          style={{ cursor: 'pointer', width: '50px', height: '50px', marginLeft: '2.5vw' }}
        />
        {isDateSelectionVisible && (
          <div className="date-selection-container">
            <div className={`date-selection ${isDateSelectionVisible ? 'visible' : ''}`}>
              <div className='caixacinza2'>
                <label htmlFor="startUnixTime">Data Inicial:</label>
                <input
                  type="datetime-local"
                  id="startUnixTime"
                  className="date-input"
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
                  className="date-input"
                  value={convertToDateTimeLocal(endUnixTime)}
                  onChange={e => {
                    const unixTime = convertToUnixTime(e.target.value);
                    setEndUnixTime(unixTime);
                  }}
                />
                <div className='filter-section'>
                  <label htmlFor="stationFilter">Filtrar por Estação:</label>
                  <select
                    id="stationFilter"
                    value={selectedStation ?? ''}
                    onChange={e => setSelectedStation(e.target.value ? Number(e.target.value) : null)}
                  >
                    <option value="">Todas</option>
                    {estacoes.map(estacao => (
                      <option key={estacao.cod_estacao} value={estacao.cod_estacao}>
                        {estacao.nome}
                      </option>
                    ))}
                  </select>

                  <label htmlFor="parameterFilter">Filtrar por Parâmetro:</label>
                  <select
                    id="parameterFilter"
                    value={selectedParameter ?? ''}
                    onChange={e => setSelectedParameter(e.target.value ? Number(e.target.value) : null)}
                  >
                    <option value="">Todos</option>
                    {tiposParametros.map(parametro => (
                      <option key={parametro.cod_tipoParametro} value={parametro.cod_tipoParametro}>
                        {parametro.nome}
                      </option>
                    ))}
                  </select>
                  <label>Download Dados Filtrados:</label>
                  <button onClick={downloadDataAsJson} className="download-button">Download JSON</button>
                  <button onClick={exportDataAsPdf} className="download-button">Download PDF</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {Object.entries(groupedData)
        .filter(([cod_tipoParametro, estacoesData]) => {
          const hasDataForSelectedStation = Object.keys(estacoesData).some(cod_estacao =>
            selectedStation === null || Number(cod_estacao) === selectedStation
          );
          return (selectedParameter === null || Number(cod_tipoParametro) === selectedParameter) && hasDataForSelectedStation;
        })
        .map(([cod_tipoParametro, estacoesData]) => (
          <div key={cod_tipoParametro} className='caixacinza'>
            <h2>Parâmetro: {getParametroNome(Number(cod_tipoParametro))}</h2>
            {Object.entries(estacoesData)
              .filter(([cod_estacao]) => selectedStation === null || Number(cod_estacao) === selectedStation)
              .map(([cod_estacao, values]) => {
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
                  <div key={cod_estacao} className='caixacinzaclaro'>
                    <h3>Estação: {getEstacaoNome(Number(cod_estacao))}</h3>
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
                );
              })}
          </div>
        ))}
    </div>
  );
};

const convertToUnixTime = (dateString: string): number => {
  return Math.floor(new Date(dateString).getTime() / 1000);
};

const convertToDateTimeLocal = (unixTime: number | null): string => {
  return unixTime ? new Date(unixTime * 1000).toISOString().slice(0, 16) : '';
};

export default DataByCodParametro;