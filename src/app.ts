import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './interface/http/middlewares/error';
import authRoutes from './interface/http/routes/auth.routes';
import { notFound } from './interface/http/middlewares/not-found';
import { logger } from './interface/http/middlewares/logger';


export const app = express();

if (process.env.NODE_ENV !== 'production') {
    app.use(logger);
}

app.use(express.json());
app.use(cors());
app.use(helmet());

app.get('/', (_req, res) => res.json({ ok: true }));
app.use('/api/auth', authRoutes);

app.use(notFound);
app.use(errorHandler);
