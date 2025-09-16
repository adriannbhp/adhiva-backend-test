import jwt from "jsonwebtoken"
import { env } from "../../config/env";

function toSeconds(v: string | number): number {
    if (typeof v === "number") return v;
    const m = v.match(/^\d+[smhd]$/i);
    if (!m) throw new Error(`${m} is not a valid number`);
    const n = Number(m[1]);
    const unit = m[2].toLowerCase();
    const mult = unit === 's' ? 1 : unit === 'm' ? 60 : unit === 'h' ? 3600 : 86400;
    return n * mult;
}

export class JwtSigner {
    sign<T extends object>(payload: T,subject?: string) {
        const expiresInSeconds = toSeconds(env.JWT_EXPIRES_IN);
        const opts: jwt.SignOptions = { expiresIn: expiresInSeconds };
        if (subject) opts.subject = String(subject);
        return jwt.sign(payload as any, env.JWT_SECRET, opts);
    }


    verify<T = unknown>(token: string) {
        try {
            return jwt.verify(token, env.JWT_SECRET) as T;
        } catch (e: any) {
            const msg = e?.name === 'TokenExpiredError' ? 'Token Expired' : 'Invalid token';
            throw Object.assign(new Error(msg), { statusCode: 401});
        }
    }
}