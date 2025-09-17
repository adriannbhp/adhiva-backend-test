import type { Request, Response, NextFunction } from 'express';
import { container } from '../../../di/container';

export async function searchByNama(req: Request, res: Response, next: NextFunction) {
    try {
        const value = String(req.query.value);
        const data = await container.usecases.search.byName(value);
        if (!data) return res.status(404).json({ message: 'Data not found' });
        res.json({ data });
    } catch (err) {
        next(err);
    }
}

export async function searchByNim(req: Request, res: Response, next: NextFunction) {
    try {
        const value = String(req.query.value);
        const data = await container.usecases.search.byNim(value);
        if (!data) return res.status(404).json({ message: 'Data not found' });
        res.json({ data });
    } catch (err) {
        next(err);
    }
}

export async function searchByYmd(req: Request, res: Response, next: NextFunction) {
    try {
        const value = String(req.query.value);
        const data = await container.usecases.search.byYmd(value);
        if (!data.length) return res.status(404).json({ message: 'No data found' });
        res.json({ data });
    } catch (err) {
        next(err);
    }
}
