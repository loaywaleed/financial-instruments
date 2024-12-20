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

const PORT = process.env.PORT || 8000;

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(rateLimiterMiddleware);
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

// Swagger configuration
const specs = swaggerJSDoc(options);
// Doc Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/api/data', dataRoutes);
app.use('/api/instrumentTypes', instrumentTypesRoutes);
app.use('/api/instruments', instrumentRoutes);
app.use('/api/candles', candleRoutes);
app.use('/api/metadata', metadataRoutes);

// Global   Error handling middleware
app.use(globalErrorHandlerMiddleware);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
