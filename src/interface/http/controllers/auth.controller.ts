import { NextFunction,Request, Response } from 'express';

import { container } from '../../../di/container';
import { parseLogin } from '../../../core/dto';

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password } = parseLogin(req.body);
        const out = await container.usecases.authLogin.execute({ email, password });
        res.json(out);
    } catch (err) {
        next(err);
    }
}