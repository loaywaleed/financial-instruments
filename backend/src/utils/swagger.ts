import { Options } from 'swagger-jsdoc';

const swaggerDefinition: Options['swaggerDefinition'] = {
  openapi: '3.0.0',
  info: {
    title: 'Futtech Financial Instruments API Documentation',
    version: '1.0.0',
    description: 'This is the API documentation for my Express app',
  },
  servers: [
    {
      url: 'http://localhost:8000', // Server URL
      description: 'Local development server',
    },
  ],
};

export const options = {
  swaggerDefinition,
  apis: ['./src/routes/**/*.ts'], // Path to the API docs
};
