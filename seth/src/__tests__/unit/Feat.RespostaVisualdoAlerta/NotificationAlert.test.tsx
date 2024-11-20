import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import NotificationAlert from '../../../components/notifications/functions/alarmActive';
import atualizarAlarmes from '../../../components/notifications/functions/updateAlarms';

// Mock da função que busca os alarmes
jest.mock('../../../components/notifications/functions/updateAlarms', () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe('NotificationAlert', () => {
    it('deve atualizar alarmes quando dados forem recebidos', async () => {
        // Mock do retorno da função
        (atualizarAlarmes as jest.Mock).mockResolvedValue({
            histAlarmes: [{ cod_alarme: 1 }],
            alarmes: [{ cod_alarme: 1, nome: 'Teste Alarme', valor: 100, condicao: '>' }],
        });

        render(<NotificationAlert />);

        // Espera que a função 'atualizarAlarmes' tenha sido chamada
        await waitFor(() => expect(atualizarAlarmes).toHaveBeenCalledTimes(1));

        // Verifica se a lista de alarmes foi atualizada
        await waitFor(() => {
            const alarme = screen.queryAllByText(/Nome do Alarme/i);
            expect(alarme).toHaveLength(1); // Espera que o nome do alarme apareça na tela
            expect(alarme[0].textContent).toBe('Nome do Alarme: Teste Alarme'); // Verifica o conteúdo do nome do alarme
        });
    });

    it('não exibe alarme quando não houver alarmes', async () => {
      // Mock do retorno da função com lista vazia
      (atualizarAlarmes as jest.Mock).mockResolvedValue({
          histAlarmes: [],
          alarmes: [],
      });
  
      render(<NotificationAlert />);
  
      // Espera que a função 'atualizarAlarmes' tenha sido chamada
      await waitFor(() => expect(atualizarAlarmes).toHaveBeenCalledTimes(2)); // Verifique se ela foi chamada 2 vezes, ou ajuste conforme o esperado
  
      // Verifica que nenhum alarme é exibido
      await waitFor(() => {
          const alarme = screen.queryAllByText(/Nome do Alarme/i);
          expect(alarme).toHaveLength(0); // Espera que não haja nenhum alarme na tela
      });
  });
});
