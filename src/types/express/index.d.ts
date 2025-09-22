import type { AuthUser } from "../../interface/http/middlewares/auth.guard";

declare global {
    namespace Express {
        interface Request {
            user?: AuthUser;
        }
    }
}
export {};

