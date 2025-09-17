import type { Request, Response, NextFunction } from 'express';
import { container } from '../../../di/container';
import { AppError } from '../../../core/errors';

export function authGuard(req: Request, _res: Response, next: NextFunction) {
    try {
        const h = req.header('authorization') || '';
        const m = h.match(/^Bearer\s+(.+)$/i);
        if (!m) throw new AppError('UNAUTHORIZED', 401, 'Missing bearer token');
        const payload = container.services.token.verify<any>(m[1]);
        (req as any).user = { id: payload.id, email: payload.email, name: payload.name };
        next();
    } catch (e) {
        next(new AppError('UNAUTHORIZED', 401, 'Invalid or expired token'));
    }
}
