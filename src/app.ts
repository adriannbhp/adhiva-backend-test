import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { errorHandler } from './interface/http/middlewares/error';
import { logger } from './interface/http/middlewares/logger';
import { notFound } from './interface/http/middlewares/not-found';
import authRoutes from './interface/http/routes/auth.routes';
import usersRoutes from './interface/http/routes/user.routes';
import searchRoutes from './interface/http/routes/search.routes';
import { corsAllowAll, corsOrigins } from './config/env';

export const app = express();

app.use(helmet());

if (process.env.NODE_ENV !== 'production') app.use(logger);

app.use(express.json()); // default: type = application/json
app.use(express.urlencoded({ extended: true }));

const corsHandler = cors(
    corsAllowAll
        ? { origin: true, credentials: true }
        : {
            credentials: true,
            origin: (origin, cb) => {
                if (!origin) return cb(null, true);
                if (corsOrigins.has(origin)) return cb(null, true);
                cb(new Error('Not allowed by CORS'));
            },
        },
);
app.use(corsHandler);

app.get('/', (_req, res) => res.json({ ok: true }));
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/search', searchRoutes);

app.use(notFound);
app.use(errorHandler);
