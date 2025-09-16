import type { UserRepo } from '../core/ports/repos';
import type { PasswordHasher } from '../core/ports/services';
import type { TokenSigner } from '../core/ports/services';
import { AuthLogin } from '../core/usecases/auth.login';
import { prisma } from '../infra/db/prisma.client';
import { PrismaUserRepo } from '../infra/db/prisma.user.repo';
import { BcryptHasher } from '../infra/security/bcrypt.hasher';
import { JwtSigner } from '../infra/security/jwt.signer';

export type Repos = { user: UserRepo };
export type Services = { hasher: PasswordHasher; token: TokenSigner };
export type Usecases = { authLogin: AuthLogin };
export type Container = {
    prisma: typeof prisma;
    repos: Repos;
    services: Services;
    usecases: Usecases;
};

export function createContainer(
    overrides?: Partial<{ repos: Partial<Repos>; services: Partial<Services> }>
): Container {
    // adapters & services default
    const userRepo: UserRepo = overrides?.repos?.user ?? new PrismaUserRepo();
    const hasher: PasswordHasher = overrides?.services?.hasher ?? new BcryptHasher();
    const token: TokenSigner = overrides?.services?.token ?? new JwtSigner();

    const usecases: Usecases = {
        authLogin: new AuthLogin(userRepo, hasher, token),
    };

    const container: Container = {
        prisma,
        repos: { user: userRepo },
        services: { hasher, token },
        usecases,
    };

    return Object.freeze(container);
}

// ---- Singleton untuk app runtime ----
export const container = createContainer();
