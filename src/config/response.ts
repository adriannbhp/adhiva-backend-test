export type StatusDefaults = {
    code: string;
    message: string;
};

export const RESPONSE_DEFAULTS: Record<number, StatusDefaults> = {
    200: { code: "SUCCESS",  message: "OK" },
    201: { code: "CREATED",  message: "Created" },
    204: { code: "NO_CONTENT", message: "No Content" },

    400: { code: "BAD_REQUEST", message: "Bad Request" },
    401: { code: "UNAUTHENTICATED", message: "Unauthenticated" },
    403: { code: "FORBIDDEN", message: "Forbidden" },
    404: { code: "NOT_FOUND", message: "Not Found" },
    409: { code: "CONFLICT", message: "Conflict" },
    422: { code: "UNPROCESSABLE_ENTITY", message: "Unprocessable Entity" },
    429: { code: "RATE_LIMITED", message: "Too Many Requests" },
    500: { code: "INTERNAL_ERROR", message: "Something went wrong" },
};
