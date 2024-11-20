export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // Ambiente jsdom para simular o navegador
  setupFilesAfterEnv: ['./jest.setup.ts'], // Configuração adicional
  moduleNameMapper: {
      '\\.(css|less|sass|scss)$': '<rootDir>/styleMock.js', // Mock para arquivos de estilo
    },
  

};

console.log('jest.config.ts loaded');
