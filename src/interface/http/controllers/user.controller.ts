import type { Request, Response, NextFunction } from 'express';
import { container } from '../../../di/container';

export async function createUser(req: Request, res: Response, next: NextFunction) {
    try {
        const out = await container.usecases.userCreate.execute(req.body);
        res.status(201).json(out);
    } catch (e) { next(e); }
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        const out = await container.usecases.userUpdate.execute({ id, ...req.body });
        res.json(out);
    } catch (e) { next(e); }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        await container.usecases.userDelete.execute(id);
        res.status(204).send();
    } catch (e) {
        next(e);
    }
}

export async function deletePermanent(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        await container.usecases.userDelete.executePermanent(id);
        res.status(204).send();
    } catch (e) {
        next(e);
    }
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        const user = await container.usecases.userGet.execute(id);
        res.json(user);
    } catch (err) {
        next(err);
    }
}

export async function listUsers(req: Request, res: Response, next: NextFunction) {
    try {
        const out = await container.usecases.userList.execute(req.query as any);
        res.json(out);
    } catch (e) { next(e); }
}
