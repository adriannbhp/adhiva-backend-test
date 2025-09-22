import type { Request, Response, NextFunction } from "express";
import type { ZodSchema } from "zod";

export function validate<T>(schema: ZodSchema<T>, source: "body"|"params"|"query") {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const raw = source === "body" ? req.body : source === "params" ? req.params : req.query;
            const parsed = schema.parse(raw);

            if (source === "body") (req as any).body = parsed;
            else if (source === "params") (req as any).params = parsed;
            else res.locals.query = parsed;

            next();
        } catch (e) {
            next(e);
        }
    };
}
