import type { LoginInput, LoginOutput } from '../dto/auth';
import { AuthError } from '../errors';
import type { UserRepo } from '../ports/repos';
import type { PasswordHasher } from '../ports/services';
import type { TokenSigner } from '../ports/services';

export class AuthLogin {
    constructor(
        private users: UserRepo,
        private hasher: PasswordHasher,
        private token: TokenSigner,
    ) {}

    async execute({ email, password }: LoginInput): Promise<LoginOutput> {
        const u = await this.users.findAuthByEmail(email.trim().toLowerCase());
        if (!u || !u.password) throw new AuthError();      // ⬅️ guard

        const ok = await this.hasher.compare(password, u.password);
        if (!ok) throw new AuthError();

        return { accessToken: this.token.sign({ id: u.id, email: u.email, name: u.name }, String(u.id)) };
    }
}
