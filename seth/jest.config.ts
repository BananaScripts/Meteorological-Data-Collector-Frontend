export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // Ambiente jsdom para simular o navegador
  setupFilesAfterEnv: ['./jest.setup.ts'], // Configuração adicional
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/styleMock.js', // Mock para arquivos de estilo
    '\\.(png|jpg|jpeg|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js', // Mock para arquivos de imagem
  },
};

console.log('jest.config.ts loaded');
