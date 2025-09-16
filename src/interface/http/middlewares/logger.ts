import pino from 'pino';
import { pinoHttp } from "pino-http";

const base = pino({
    level: process.env.LOG_LEVEL || 'info',

    transport:
    process.env.NODE_ENV !== 'production'
    ? { target: 'pino-pretty', options: { colorize: true } }
        : undefined,
});

export const logger = pinoHttp({
    logger: base,
    serializers: {
        req(req) { return { method: req.method, url: req.url }; },
        res(res) { return { statusCode: res.statusCode }; },
    },
});