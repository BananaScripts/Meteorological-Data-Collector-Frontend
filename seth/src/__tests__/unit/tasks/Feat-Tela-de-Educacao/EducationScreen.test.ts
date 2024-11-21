import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import  ContentEducation from '../../../../components/education/contentEducation';

describe('ContentEducation Component', () => {
  beforeEach(() => {
    localStorage.clear(); // Garantir estado limpo para cada teste
  });



  it('renders the initial title and buttons for unlocked sections', () => {
    render(React.createElement(ContentEducation));
    expect(screen.getByText('Curso de Matemática Aplicada à Meteorologia')).toBeInTheDocument();
    expect(screen.getByText('Resetar Progresso')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(5); // 4 seções desbloqueadas + botão de reset
  });

  it('handles section selection and renders the corresponding section content', () => {
    render(React.createElement(ContentEducation));
    const sectionButton = screen.getByText('Regra de Três');
    fireEvent.click(sectionButton);

    expect(screen.getByText('Voltar à Seleção')).toBeInTheDocument(); // Botão de retorno deve aparecer
    expect(localStorage.getItem('completedSections')).toContain('1'); // Verifica progresso salvo
  });

  it('calculates and displays overall progress correctly', () => {
    localStorage.setItem('completedSections', JSON.stringify([1, 2, 3]));
    render(React.createElement(ContentEducation));

    expect(screen.getByText('25%')).toBeInTheDocument(); // 3 de 12 seções completas (25%)
  });

  it('shows the reset popup and handles reset confirmation', () => {
    render(React.createElement(ContentEducation));
    const resetButton = screen.getByText('Resetar Progresso');
    fireEvent.click(resetButton);

    expect(screen.getByText('Confirmar Reset')).toBeInTheDocument();
    const confirmButton = screen.getByText('Sim');
    fireEvent.click(confirmButton);

    expect(localStorage.getItem('completedSections')).toBeNull(); // Progresso deve ser resetado
    expect(screen.queryByText('Confirmar Reset')).not.toBeInTheDocument(); // Popup deve desaparecer
  });

  it('handles progress unlocking based on completed sections', () => {
    localStorage.setItem('completedSections', JSON.stringify([1, 2, 3, 4]));
    render(React.createElement(ContentEducation));

    expect(screen.getByText('Progressões')).toBeInTheDocument(); // Seção desbloqueada após progresso
  });
});
