import axios from "axios";

    // Função para buscar dados de alarmes e históricos
    const atualizarAlarmes = async () => {
        try {
            const [histResponse, alarmesResponse] = await Promise.all([
                axios.get('http://localhost:30105/api/histAlarmes'),
                axios.get('http://localhost:30105/api/alarmes'),
            ]);
            return {
                histAlarmes: histResponse.data,
                alarmes: alarmesResponse.data,
            };
        } catch (error) {
            console.error('Erro ao buscar dados dos alarmes:', error);
            throw error;
        }
    };

    export default atualizarAlarmes