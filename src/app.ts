import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import {errorHandler, notFound} from './interface/http/middlewares/error';
import authRoutes from './interface/http/routes/auth.routes';
import usersRoutes from './interface/http/routes/user.routes';
import searchRoutes from './interface/http/routes/search.routes';
import { corsAllowAll, corsOrigins } from './config/env';
import {pinoHttp} from "pino-http";
import { randomUUID } from "crypto";
import {responseHelpers} from "./interface/http/middlewares/response";

export const app = express();

app.use(helmet());

app.use(
    pinoHttp({
        genReqId: (): string => randomUUID(),
        autoLogging: true,
        transport: process.env.NODE_ENV === "development"
            ? { target: "pino-pretty", options: { colorize: true, singleLine: true } }
            : undefined,
    })
);

app.use(express.json());app.use(express.urlencoded({ extended: true }));

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
app.use(responseHelpers);

app.get('/', (_req, res) => res.json({ ok: true }));
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/search', searchRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
