import type { UserRepo } from '../ports/repos';
import { NotFoundError, ForbiddenError } from '../errors';

export class UserDelete {
    constructor(private users: UserRepo) {}

    async execute(id: number, actor?: { id: number; role: 'ADMIN' | 'USER' }): Promise<void> {
        const cur = await this.users.findById(id);
        if (!cur) throw new NotFoundError('User not found');

        // Authorization check: only admin or owner can soft delete
        if (actor && actor.role !== 'ADMIN' && actor.id !== id) {
            throw new ForbiddenError('You are not allowed to delete this user');
        }

        await this.users.softDelete(id);
    }

    async executePermanent(id: number, actor?: { id: number; role: 'ADMIN' | 'USER' }): Promise<void> {
        const cur = await this.users.findById(id, { includeInactive: true });
        if (!cur) throw new NotFoundError('User not found');

        // Only ADMIN can do permanent delete
        if (actor && actor.role !== 'ADMIN') {
            throw new ForbiddenError('Only admin can permanently delete users');
        }

        await this.users.delete(id);
    }
}