import type { Request, Response, NextFunction } from "express";
import { container } from "../../../di/container";
import {
    CreateUserSchema,
    UpdateUserSchema,
    ListUserSchema,
    ParamIdSchema,
} from "../../../core/dto";

export async function createUser(req: Request, res: Response, next: NextFunction) {
    try {
        const input = CreateUserSchema.parse(req.body);
        const out = await container.usecases.userCreate.execute(input);
        return res.status(201).json({
            code: "CREATED",
            message: "User created",
            data: out,
        });
    } catch (e) {
        next(e);
    }
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = ParamIdSchema.parse(req.params);
        const body = UpdateUserSchema.parse(req.body);
        const out = await container.usecases.userUpdate.execute({ id, ...body });
        return res.status(200).json({
            code: "SUCCESS",
            message: "User updated",
            data: out,
        });
    } catch (e) {
        next(e);
    }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = ParamIdSchema.parse(req.params);
        await container.usecases.userDelete.execute(id);
        return res.status(204).send();
    } catch (e) {
        next(e);
    }
}

export async function deletePermanent(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = ParamIdSchema.parse(req.params);
        await container.usecases.userDelete.executePermanent(id);
        return res.status(204).send();
    } catch (e) {
        next(e);
    }
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = ParamIdSchema.parse(req.params);
        const user = await container.usecases.userGet.execute(id);
        return res.status(200).json({
            code: "SUCCESS",
            message: "OK",
            data: user,
        });
    } catch (e) {
        next(e);
    }
}

export async function listUsers(req: Request, res: Response, next: NextFunction) {
    try {
        const query = ListUserSchema.parse(req.query);
        const out = await container.usecases.userList.execute(query);
        return res.status(200).json({
            code: "SUCCESS",
            message: "OK",
            data: out,
        });
    } catch (e) {
        next(e);
    }
}
