import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { errorHandler } from './interface/http/middlewares/error';
import { logger } from './interface/http/middlewares/logger';
import { notFound } from './interface/http/middlewares/not-found';
import authRoutes from './interface/http/routes/auth.routes';
import { corsAllowAll, corsOrigins } from './config/env';


export const app = express();

if (process.env.NODE_ENV !== 'production') {
    app.use(logger);
}

if (corsAllowAll) {
    app.use(cors({ origin: true, credentials: true }));
} else {
    app.use(cors({
        credentials: true,
        origin: (origin, cb) => {
            if (!origin) return cb(null, true);                    // curl/postman
            if (corsOrigins.has(origin)) return cb(null, true);
            cb(new Error('Not allowed by CORS'));
        }
    }));
}

app.use(express.json());
app.use(cors());
app.use(helmet());

app.get('/', (_req, res) => res.json({ ok: true }));
app.use('/api/auth', authRoutes);

app.use(notFound);
app.use(errorHandler);
