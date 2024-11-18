
import React from 'react';
import { render, screen } from '@testing-library/react';
import NotificationHist from '../../../components/notifications/functions/alarmHist'; // Caminho ajustado para o teste

describe('NotificationHist Component', () => {
    test('renderiza gráfico e tabelas corretamente', () => {
        const alarmes = [
            { nome: 'Alarme 1', condicao: '>', valor: 10 },
            { nome: 'Alarme 2', condicao: '<', valor: 5 },
        ];
        const acionados = [
            { nome: 'Alarme 3', valor: 20 },
        ];

        render(<NotificationHist alarmes={alarmes} acionados={acionados} />);

        // Verifica se as tabelas foram renderizadas
        expect(screen.getByText('Alarmes Criados')).toBeInTheDocument();
        expect(screen.getByText('Alarmes Ativados')).toBeInTheDocument();

        // Verifica dados na tabela de alarmes criados
        expect(screen.getByText('Alarme 1')).toBeInTheDocument();
        expect(screen.getByText('Alarme 2')).toBeInTheDocument();

        // Verifica dados na tabela de alarmes ativados
        expect(screen.getByText('Alarme 3')).toBeInTheDocument();

        // Verifica se o gráfico foi renderizado
        const canvas = screen.getByRole('img', { name: /alarmeChart/i });
        expect(canvas).toBeInTheDocument();
    });
});
