import jwt from "jsonwebtoken"

import { env } from "../../config/env";
import type { TokenSigner } from '../../core/ports/services';

function toSeconds(v: string | number): number {
    if (typeof v === 'number') return v;
    const m = v.match(/^(\d+)([smhd])$/i);
    const n = Number(m![1]), u = m![2].toLowerCase();
    return n * (u === 's' ? 1 : u === 'm' ? 60 : u === 'h' ? 3600 : 86400);
}

export class JwtSigner implements TokenSigner {
    sign<T extends object>(payload: T, subject?: string) {
        const opts: jwt.SignOptions = { expiresIn: toSeconds(env.JWT_EXPIRES_IN) };
        if (subject) opts.subject = String(subject);
        return jwt.sign(payload as any, env.JWT_SECRET, opts);
    }
    verify<T = unknown>(token: string): T {
        return jwt.verify(token, env.JWT_SECRET) as T;
    }
}