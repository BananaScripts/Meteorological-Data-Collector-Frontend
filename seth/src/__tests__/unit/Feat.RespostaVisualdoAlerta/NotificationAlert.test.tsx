
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import NotificationAlert from '../../../components/notifications/functions/alarmActive'; // Caminho ajustado para o teste

jest.useFakeTimers();

describe('NotificationAlert Component', () => {
    test('exibe pop-up quando um novo alarme é disparado', async () => {
        render(<NotificationAlert />);

        // Simula um novo alarme disparado
        act(() => {
            jest.advanceTimersByTime(100); // Simula tempo para atualizar alarmes
        });

        // Pop-up é exibido
        const popup = await screen.findByText(/ALARME DISPARADO!/i);
        expect(popup).toBeInTheDocument();

        // Espera 10 segundos para o pop-up desaparecer
        act(() => {
            jest.advanceTimersByTime(10000);
        });
        expect(screen.queryByText(/ALARME DISPARADO!/i)).toBeNull();
    });
});
