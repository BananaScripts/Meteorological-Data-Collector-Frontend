import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DataDisplay = () => {
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

  return (
    <div>
      <h1>Dados Coletados</h1>
      {dados.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Código dos Dados</th>
              <th>Nome do Parâmetro</th>
              <th>Valor</th>
              <th>Unix Time</th>
            </tr>
          </thead>
          <tbody>
            {dados.map((item) => {
              // Encontre o nome do parâmetro correspondente
              const parametro = tiposParametros.find(param => param.cod_tipoParametro === item.cod_parametro);
              const parametroNome = parametro ? parametro.nome : 'Desconhecido';

              return (
                <tr key={item.cod_dados}>
                  <td>{item.cod_dados}</td>
                  <td>{parametroNome}</td>
                  <td>{item.Valor}</td>
                  <td>{item.unixtime}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div>Nenhum dado disponível.</div>
      )}
    </div>
  );
};

export default DataDisplay;
