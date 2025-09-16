import { NextFunction,Request, Response } from 'express';

import { container } from '../../../di/container';
import type { LoginBody } from '../validators/auth';

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password } = req.body as LoginBody;
        const out = await container.usecases.authLogin.execute({ email, password });
        res.json(out);
    } catch (err) {
        next(err);
    }
}