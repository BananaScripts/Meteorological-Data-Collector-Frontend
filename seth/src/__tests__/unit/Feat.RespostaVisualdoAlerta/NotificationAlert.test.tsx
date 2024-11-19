import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import NotificationAlert from '../../../components/notifications/functions/alarmActive';
import axios from 'axios';

// Mock do temporizador
jest.useFakeTimers();

// Mock do axios
jest.mock('axios');

// Mock de dados, se necessário
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('NotificationAlert Component', () => {
  test('exibe pop-up quando um novo alarme é disparado', async () => {
    // Mocka as respostas do axios
    mockedAxios.get.mockResolvedValueOnce({
      data: [
        // Mock da resposta de alarmes
        { cod_alarme: 1, cod_tipoParametro: 101, nome: 'Alarme 1', valor: 10, condicao: '>' },
      ]
    })
      .mockResolvedValueOnce({
        data: [
          // Mock da resposta de histAlarmes
          { cod_alarme: 1, cod_tipoParametro: 101, nome: 'Alarme 1', valor: 10, condicao: '>' },
        ]
      });

    render(<NotificationAlert />);

    // Simula um novo alarme disparado internamente
    act(() => {
      jest.advanceTimersByTime(100); // Simula tempo para atualizar alarmes
    });

    // Verifica se o pop-up é exibido
    const popup = await screen.findByText(/ALARME DISPARADO!/i);
    expect(popup).toBeInTheDocument();

    // Simula tempo para o pop-up desaparecer
    act(() => {
      jest.advanceTimersByTime(10000); // 10 segundos para desaparecer
    });

    await waitFor(() => screen.queryByText(/ALARME DISPARADO!/i));

    expect(screen.queryByText(/ALARME DISPARADO!/i)).toBeNull();
  });
});
