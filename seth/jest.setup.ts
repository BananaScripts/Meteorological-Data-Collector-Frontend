import '@testing-library/jest-dom';

global.ResizeObserver = class ResizeObserver {
  observe() {};
  unobserve() {};
  disconnect() {};
};


console.log('jest.setup.ts loaded');
