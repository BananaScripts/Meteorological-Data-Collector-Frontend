import axios from "axios";

    // Função para buscar dados de alarmes e históricos
    const atualizarAlarmes = async () => {
        try {
            const [histResponse, alarmesResponse] = await Promise.all([
                axios.get('https://seth-backend-app-652283507250.southamerica-east1.run.app/api/histAlarmes'),
                axios.get('https://seth-backend-app-652283507250.southamerica-east1.run.app/api/alarmes'),
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