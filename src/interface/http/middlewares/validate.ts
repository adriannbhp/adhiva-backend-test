import type { Request, Response, NextFunction } from 'express';
import type { ZodTypeAny } from 'zod';
import { ValidationError } from '../../../core/errors';

export function validate(schema: ZodTypeAny, part: 'body' | 'query' | 'params' = 'body') {
    return (req: Request, res: Response, next: NextFunction) => {
        const source =
            part === 'body' ? (req.body ?? {}) :
                part === 'query' ? (req.query ?? {}) :
                    (req.params ?? {});
        const parsed = schema.safeParse(source);
        if (!parsed.success) {
            const details = { ...parsed.error.flatten(), issues: parsed.error.issues };
            return next(new ValidationError(details));
        }
        (res.locals.input ??= {})[part] = parsed.data;
        next();
    };
}