import bcrypt from "bcryptjs";

import { env } from "../../config/env"
import type { PasswordHasher } from '../../core/ports/services';

export class BcryptHasher implements PasswordHasher {
    hash(pw: string) { return bcrypt.hash(pw, env.BCRYPT_ROUNDS); }
    compare(pw: string, hash: string) { return bcrypt.compare(pw, hash); }
}