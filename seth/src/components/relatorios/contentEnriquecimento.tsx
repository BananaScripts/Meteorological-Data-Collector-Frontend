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
import { Estacao } from '../../types/estacao';
import { tipoParametro } from '../../types/tipoParametro';
import { Parametro } from '../../types/parametro';
import "./contentRelatorios.css";

interface DadoRecebido {
  cod_dados: number;
  cod_parametro: number;
  Valor: string;
  unixtime: number;
  estado: string;
  unidade: string;
}

const GraficosPersonalizados: React.FC = () => {
  const [dados, setDados] = useState<DadoRecebido[]>([]);  // Dados dos sensores
  const [estacoes, setEstacoes] = useState<Estacao[]>([]);  // Estações com seus estados
  const [tipoParametros, setTipoParametros] = useState<tipoParametro[]>([]);  // Tipo de parâmetros com unidades de medida
  const [parametros, setParametros] = useState<Parametro[]>([]);  // Parâmetros conectando estação e tipo de parâmetro
  const [loading, setLoading] = useState(true);
  const [estadoFiltro, setEstadoFiltro] = useState<string>('');
  const [unidadeFiltro, setUnidadeFiltro] = useState<string>('');
  const [dadosFiltrados, setDadosFiltrados] = useState<{ x: number; Dados: number }[]>([]);

  const fetchEstacoes = async () => {
    try {
      const response = await axios.get<Estacao[]>('https://seth-backend-app-652283507250.southamerica-east1.run.app/api/estacoes');
      setEstacoes(response.data);
    } catch (error) {
      console.error('Erro ao carregar as estações:', error);
    }
  };

  const fetchTipoParametros = async () => {
    try {
      const response = await axios.get<tipoParametro[]>('https://seth-backend-app-652283507250.southamerica-east1.run.app/api/tiposParametros');
      setTipoParametros(response.data);
    } catch (error) {
      console.error('Erro ao carregar os parâmetros:', error);
    }
  };

  const fetchParametros = async () => {
    try {
      const response = await axios.get<Parametro[]>('https://seth-backend-app-652283507250.southamerica-east1.run.app/api/parametros');
      setParametros(response.data);
    } catch (error) {
      console.error('Erro ao carregar os parâmetros de associação:', error);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get<DadoRecebido[]>(
        'https://seth-backend-app-652283507250.southamerica-east1.run.app/api/dados'
      );
      setDados(response.data);
      console.log('Dados carregados com sucesso.', response.data);
    } catch (error) {
      console.error('Erro ao carregar os dados:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEstacoes();
    fetchTipoParametros();
    fetchParametros();
    fetchData();
  }, []);

  useEffect(() => {
    console.log('Estado Filtro:', estadoFiltro, 'Unidade Filtro:', unidadeFiltro);
    console.log('Dados:', dados, 'Estacoes:', estacoes, 'TiposParametros:', tipoParametros, 'Parametros:', parametros);
  
    if (!loading && estadoFiltro && unidadeFiltro) {
      // Criando mapas para buscar as associações rapidamente
      const estacoesMap = new Map(estacoes.map(estacao => [estacao.cod_estacao, estacao]));
      const parametrosMap = new Map(parametros.map(param => [param.cod_parametro, param]));
      const tiposParametrosMap = new Map(tipoParametros.map(tipo => [tipo.cod_tipoParametro, tipo]));
  
      // Juntando os dados com as associações de estação e tipo de parâmetro
      const dadosCompletos = dados.map(dado => {
        const estacao = estacoesMap.get(dado.cod_parametro);
        const parametro = parametrosMap.get(dado.cod_parametro);
        const tipoParametro = parametro ? tiposParametrosMap.get(parametro.cod_tipoParametro) : undefined;
  
        return {
          ...dado,
          estado: estacao ? estacao.estado : '',  // Pode ser vazio se não encontrar
          unidade: tipoParametro ? tipoParametro.unidadeMedida : '',  // Pode ser vazio se não encontrar
        };
      });
  
      // Exibindo os dados completos para verificação
      console.log('Dados completos:', dadosCompletos);
  
      // Aplicando o filtro para evitar estados e unidades vazias
      const dadosFiltrados = dadosCompletos.filter(
        (dado) => dado.estado.trim() === estadoFiltro.trim() && dado.unidade.trim() === unidadeFiltro.trim()
      ).map((dado) => ({
        x: dado.unixtime,
        Dados: parseFloat(dado.Valor),
      }));
  
      // Atualizando o estado de dados filtrados
      setDadosFiltrados(dadosFiltrados);
    }
  }, [estadoFiltro, unidadeFiltro, dados, estacoes, tipoParametros, parametros, loading]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className='grafico-container'>
      <div className='filter-section' style={
            {
              width: '80%',
              marginLeft: '10%'
            }
          }>
        <label>
          Estado:
          <br />
          <select className="date-selection2"  value={estadoFiltro} onChange={(e) => setEstadoFiltro(e.target.value)}>
            <option value="">Selecione o Estado</option>
            {estacoes.map((estacao) => (
              <option key={estacao.cod_estacao} value={estacao.estado}>
                {estacao.estado}
              </option>
            ))}
          </select>
        </label>
        <label>
          Unidade:
          <br />
          <select className="date-selection2" value={unidadeFiltro} onChange={(e) => setUnidadeFiltro(e.target.value)}>
            <option value="">Selecione a Unidade</option>
            {tipoParametros.map((parametro) => (
              <option key={parametro.parametroID} value={parametro.unidadeMedida}>
                {parametro.unidadeMedida}
              </option>
            ))}
          </select>
        </label>
      </div>


      {estadoFiltro && unidadeFiltro && dadosFiltrados.length > 0 ? (
        <div className='caixacinza'>
          <h2>Gráfico de Dados</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dadosFiltrados}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="x"
                tickFormatter={(tick) => new Date(tick * 1000).toLocaleString()}
              />
              <YAxis />
              <Tooltip labelFormatter={(label) => new Date(label * 1000).toLocaleString()} />
              <Legend />
              <Line
                type="monotone"
                dataKey="Dados"
                name="Valor"
                stroke="#8884d8"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div>
          {estadoFiltro && unidadeFiltro ? (
            <p>Nenhum dado encontrado para os filtros selecionados.</p>
          ) : (
            <p>Selecione o estado e a unidade para exibir o gráfico.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default GraficosPersonalizados;
