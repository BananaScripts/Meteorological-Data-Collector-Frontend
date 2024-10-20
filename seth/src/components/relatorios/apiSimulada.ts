import axios from 'axios';

// Tipos de dados
export interface Estacao {
    cod_estacao: string;
    nome: string;
}

export interface Parametro {
    cod_parametro: string;
    nome: string;
}

export interface EstacaoData {
    parametro: any;
    cod_estacao: string;
    cod_parametro: string;
    valor: number;
    dataMedicao: string;
}

// Função para listar todas as estações
export const listarEstacoes = async (): Promise<Estacao[]> => {
    try {
        const response = await axios.get<Estacao[]>('http://localhost:30105/api/estacoes');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar estações:', error);
        return [];
    }
};

// Função para listar todos os dados
export const listarDados = async (): Promise<EstacaoData[]> => {
    try {
        const response = await axios.get<EstacaoData[]>('http://localhost:30105/api/dados');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar todos os dados:', error);
        return [];
    }
};

// Função para listar todos os parâmetros
export const listarParametros = async (): Promise<Parametro[]> => {
    try {
        const response = await axios.get<Parametro[]>('http://localhost:30105/api/tiposParametros');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar parâmetros:', error);
        return [];
    }
};

// Função para filtrar os dados de uma estação específica
export const filtrarDadosPorEstacao = async (cod_estacao: string): Promise<{ [parametro: string]: EstacaoData[] }> => {
    try {
        // Obtém todos os dados
        const todosDados = await listarDados();

        // Filtra os dados pela estação selecionada
        const dadosEstacao = todosDados.filter(dado => dado.cod_estacao === cod_estacao);

        // Agrupa os dados por parâmetro
        const dadosPorParametro: { [parametro: string]: EstacaoData[] } = {};
        dadosEstacao.forEach(dado => {
            const parametro = dado.cod_parametro;
            if (!dadosPorParametro[parametro]) {
                dadosPorParametro[parametro] = [];
            }
            dadosPorParametro[parametro].push(dado);
        });

        return dadosPorParametro;
    } catch (error) {
        console.error(`Erro ao filtrar dados para a estação ${cod_estacao}:`, error);
        return {};
    }
};
