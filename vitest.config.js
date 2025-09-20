//// <reference types="vitest/config" />
import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    dir: './src/tests',
    setupFiles: ['./src/tests/globalSetup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*'],
      exclude: ['src/tests/**/*', 'src/db/**/*', 'src/**/types/**/*'],
    },
  },
});
