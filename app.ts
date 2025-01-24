import express, { Application } from 'express';
import cors from 'cors';
import predictionRoutes from './routes/predictionRoutes';
import errorHandler from './middlewares/errorHandler';

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/predict', predictionRoutes);

app.use(errorHandler);

export default app;
