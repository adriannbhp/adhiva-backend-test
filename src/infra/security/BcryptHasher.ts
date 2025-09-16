import bcrypt from "bcryptjs";
import { env } from "../..//config/env"

export class BcryptHasher {
    hash(pw: string) { return bcrypt.hash(pw, env.BCRYPT_ROUNDS); }
    compare(pw: string, hash: string) { return bcrypt.compare(pw, hash); }
}