import { defineConfig } from 'cypress';
import viteConfig from './vite.config';

export default defineConfig({
  component: {
    specPattern: "cypress/component/**/*.cy.{js,ts,jsx,tsx}",
    devServer: {
      framework: 'react',
      bundler: 'vite',
      viteConfig,

    },
  },

  e2e: {
    baseUrl: 'http://localhost:3001',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});