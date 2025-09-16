import { NextFunction,Request, Response } from 'express';
import { z } from 'zod';

import { ValidationError } from '../../../core/errors';

export function validate(schema: z.ZodTypeAny, part: 'body'|'query'|'params' = 'body') {
    return (req: Request, res: Response, next: NextFunction) => {
        const r = schema.safeParse((req as any)[part]);
        if (!r.success) return next(new ValidationError(r.error.flatten()));
        (req as any)[part] = r.data;
        next();
    };
}