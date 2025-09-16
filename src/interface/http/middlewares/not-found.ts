import { Request, Response } from 'express';

export function notFound(req: Request, res: Response) {
    res.status(404).json({ code: 'NOT_FOUND', message: 'Route not found', path: req.originalUrl });
}
