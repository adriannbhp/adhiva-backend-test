export type ApiSuccess<T = unknown> = {
    code: string;              // e.g. "SUCCESS", "CREATED"
    message?: string;          // e.g. "OK", "User created"
    data?: T;                  // payload
    meta?: Record<string, any>;// optional (pagination, etc)
};

export type ApiError = {
    code: string;              // e.g. "VALIDATION_ERROR"
    message: string;           // human-readable
    meta?: Record<string, any>;// optional detail (errors, fields, etc)
};
