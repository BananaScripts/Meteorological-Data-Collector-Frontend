import React from 'react';
import { render, screen } from '@testing-library/react';
import NotificationHist from '../../../../components/notifications/functions/alarmHist';

describe('NotificationHist Component', () => {
  test('renderiza tabelas corretamente', async () => {
    // Dados mockados para alarmes e acionados
    const alarmes = [
      { cod_alarme: 1, cod_tipoParametro: 101, nome: 'Alarme 1', condicao: '>', valor: 10 },
      { cod_alarme: 2, cod_tipoParametro: 102, nome: 'Alarme 2', condicao: '<', valor: 5 },
    ];
    const acionados = [
      { cod_alarme: 3, cod_tipoParametro: 103, nome: 'Alarme 3', condicao: '>', valor: 20 },
    ];

    render(React.createElement(NotificationHist, { alarmes, acionados }));

    // Verifica se as tabelas foram renderizadas
    expect(await screen.findByText('Alarmes Criados')).toBeInTheDocument();
    expect(await screen.findByText('Alarmes Ativados')).toBeInTheDocument();

    // Verifica dados na tabela de alarmes criados
    expect(await screen.findByText('Alarme 1')).toBeInTheDocument();
    expect(await screen.findByText('Alarme 2')).toBeInTheDocument();

    // Verifica dados na tabela de alarmes ativados
    expect(await screen.findByText('Alarme 3')).toBeInTheDocument();
  });
});
