import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DataDisplay = () => {
  interface DadosItem {
    _id: string;
    uid: string;
    unx: number;
    temp: number;
    umi: number;
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
          axios.get<DadosItem[]>('https://seth-backend-app-652283507250.southamerica-east1.run.app/api/dados'),
          axios.get<TipoParametro[]>('http://seth-backend-app-652283507250.southamerica-east1.run.app/api/tiposparametros'),
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
              const parametro = tiposParametros.find(param => param.cod_tipoParametro === Number(item._id));
              const parametroNome = parametro ? parametro.nome : 'Desconhecido';

              return (
                <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.uid}</td>
                <td>{item.unx}</td>
                <td>{item.temp}</td>
                <td>{item.umi}</td>
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
