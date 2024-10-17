import axios from 'axios';

// Tipos de dados
export interface Estacao {
    cod_estacao: string;
    nome: string;
}

export interface EstacaoData {
    temperatura: number;
    umidade: number;
    velocidadeVento: number;
    dataMedicao: string;
}

// Função para listar os tipos de parâmetros
export const listarTiposParametros = async (): Promise<any[]> => {
    try {
        const response = await axios.get('http://localhost:3002/tipoParametro/listar');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar tipos de parâmetros:', error);
        return [];
    }
};

// Função para listar estações
export const listarEstacoes = async (): Promise<Estacao[]> => {
    try {
        const response = await axios.get<Estacao[]>('http://localhost:3002/estacao/listar');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar estações:', error);
        return [];
    }
};

// Função para listar dados de estações específicas
export const buscarEstacaoPorCodigo = async (cod_estacao: string): Promise<EstacaoData[]> => {
    try {
        const response = await axios.get<EstacaoData[]>(`http://localhost:3002/estacao/listarDados?cod_estacao=${cod_estacao}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar dados da estação ${cod_estacao}:`, error);
        return [];
    }
};
