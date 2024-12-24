/* Desc: Swagger setup */
import { Options } from 'swagger-jsdoc';

const swaggerDefinition: Options['swaggerDefinition'] = {
  openapi: '3.0.0',
  info: {
    title: 'Futtech Financial Instruments API Documentation',
    version: '1.0.0',
    description: 'Financial instruments API documentation',
  },
  servers: [
    {
      url: 'http://localhost:8000',
      description: 'Local development server',
    },
  ],
};

export const options = {
  swaggerDefinition,
  apis: ['./src/routes/**/*.ts'],
};
