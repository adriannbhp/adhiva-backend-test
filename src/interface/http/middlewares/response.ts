import type { NextFunction, Request, Response } from "express";
import {RESPONSE_DEFAULTS} from "../../../config/response";
import {ApiSuccess} from "../../../types/app";

declare global {
    namespace Express {
        interface Response {
            envelope: <T>(status: number, data?: T, opts?: { code?: string; message?: string; meta?: Record<string, any> }) => Response;
            ok:      <T>(data?: T, message?: string, code?: string) => Response;
            created: <T>(data?: T, message?: string, code?: string) => Response;
            page:    <T>(items: T[], meta: { page: number; perPage: number; total: number }, message?: string, code?: string) => Response;
            noContent: () => Response;
        }
    }
}

export function responseHelpers(_req: Request, res: Response, next: NextFunction) {
    res.envelope = function <T>(status: number, data?: T, opts?: { code?: string; message?: string; meta?: Record<string, any> }) {
        const defaults = RESPONSE_DEFAULTS[status] ?? { code: "UNKNOWN", message: "" };
        const code    = opts?.code    ?? defaults.code;
        const message = opts?.message ?? defaults.message;

        // 204: tidak boleh ada body
        if (status === 204) return res.status(204).send();

        const body: ApiSuccess<T> = {
            code,
            ...(message ? { message } : {}),
            ...(data !== undefined ? { data } : {}),
            ...(opts?.meta ? { meta: opts.meta } : {}),
        };
        return res.status(status).json(body);
    };

    res.ok = function <T>(data?: T, message?: string, code?: string) {
        return res.envelope<T>(200, data, { message, code });
    };

    res.created = function <T>(data?: T, message?: string, code?: string) {
        return res.envelope<T>(201, data, { message, code });
    };

    type PageMeta = { page: number; perPage: number; total: number };

    res.page = function <T>(items: T[], meta: PageMeta, message?: string, code?: string) {
        const { page, perPage, total } = meta;
        const totalPages = Math.max(1, Math.ceil(total / Math.max(1, perPage)));
        return res.envelope<T[]>(200, items, {
            message,
            code,
            meta: { page, perPage, total, totalPages },
        });
    };

    res.noContent = function () {
        return res.envelope(204);
    };

    next();
}
