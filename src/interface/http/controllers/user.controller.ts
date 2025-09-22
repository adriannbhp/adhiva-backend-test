import type { Request, Response, NextFunction } from "express";
import { container } from "../../../di/container";
import {
    CreateUserSchema,
    UpdateUserSchema,
    ListUserSchema,
    ParamIdSchema,
} from "../../../core/dto";
import { ZodError } from "zod";

export async function createUser(req: Request, res: Response, next: NextFunction) {
    try {
        const input = CreateUserSchema.parse(req.body);
        const out = await container.usecases.userCreate.execute(input);
        return res.created(out); // 201 { code, message, data }
    } catch (e) {
        if (e instanceof ZodError) {
            return res.status(400).json({
                code: "VALIDATION_ERROR",
                message: "Validation failed",
                meta: { errors: e.flatten() },
            });
        }
        next(e);
    }
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = ParamIdSchema.parse(req.params);
        const body = UpdateUserSchema.parse(req.body);
        const out = await container.usecases.userUpdate.execute({ id, ...body });
        return res.ok(out); // 200 { code, message, data }
    } catch (e) {
        next(e);
    }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        await container.usecases.userDelete.execute(id);
        return res.noContent(); // 204
    } catch (e) {
        next(e);
    }
}

export async function deletePermanent(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        await container.usecases.userDelete.executePermanent(id);
        return res.noContent(); // 204
    } catch (e) {
        next(e);
    }
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        const user = await container.usecases.userGet.execute(id);
        return res.ok(user); // 200
    } catch (err) {
        next(err);
    }
}

export async function listUsers(req: Request, res: Response, next: NextFunction) {
    try {
        const query = ListUserSchema.parse(req.query);
        const out = await container.usecases.userList.execute(query);
        return res.ok(out); // 200
    } catch (e) {
        next(e);
    }
}
