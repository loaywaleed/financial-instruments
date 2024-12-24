import express, { Application } from 'express';
import helmet from 'helmet';
import { rateLimiterMiddleware } from './middleware/rateLimiterMiddleware';
import dataRoutes from './routes/dataRoutes';
import instrumentTypesRoutes from './routes/instrumentTypesRoutes';
import { globalErrorHandlerMiddleware } from './middleware/errorMiddleware';
import instrumentRoutes from './routes/instrumentRoutes';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { options } from './utils/swagger';
import candleRoutes from './routes/candleRoutes';
import metadataRoutes from './routes/metadataRoute';
import { ENV } from './config/environment';
import fs from 'fs';

const PORT = ENV.PORT || 8000;

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(rateLimiterMiddleware);
if (ENV.NODE_ENV === 'production') {
  app.use(
    cors({
      origin: 'https://financial-instruments.vercel.app/',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    })
  );
}

// Doc Routes
console.log(ENV.NODE_ENV);
if (ENV.NODE_ENV === 'development') {
  app.use(
    cors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    })
  );
  const specs = swaggerJSDoc(options);
  fs.writeFileSync('openapi.json', JSON.stringify(specs, null, 2));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}

// Routes
app.use('/api/v1/data', dataRoutes);
app.use('/api/v1/instrumentTypes', instrumentTypesRoutes);
app.use('/api/v1/instruments', instrumentRoutes);
app.use('/api/v1/candles', candleRoutes);
app.use('/api/v1/metadata', metadataRoutes);

// Global Error handling middleware
app.use(globalErrorHandlerMiddleware);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
