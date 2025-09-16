export class AppError extends Error {
    constructor(public code: string, public status: number, message?: string, public meta?: unknown) {
        super(message ?? code);
    }
}
export class ValidationError extends AppError {
    constructor(public errors: unknown) { super('VALIDATION_ERROR', 400, 'Validation failed', { errors }); }
}
export class AuthError extends AppError {
    constructor(msg = 'Invalid credentials') { super('AUTH_INVALID', 401, msg); }
}
export class ForbiddenError extends AppError {
    constructor(msg = 'Forbidden') { super('FORBIDDEN', 403, msg); }
}
export class NotFoundError extends AppError {
    constructor(msg = 'Not found') { super('NOT_FOUND', 404, msg); }
}
export class ConflictError extends AppError {
    constructor(msg = 'Conflict') { super('CONFLICT', 409, msg); }
}
