import type { Request, Response, NextFunction } from "express";

export function requireRole(role: "ADMIN") {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) return res.status(401).json({ code: "UNAUTHORIZED" });
        if (req.user.role !== role) return res.status(403).json({ code: "FORBIDDEN" });
        next();
    };
}

export function requireSelfOrAdmin(req: Request, res: Response, next: NextFunction) {
    const user = req.user;
    const paramId = Number(req.params.id);
    if (!user) return res.status(401).json({ code: "UNAUTHENTICATED", message: "Login required" });

    if (user.role === "ADMIN" || user.id === paramId) return next();
    return res.status(403).json({ code: "FORBIDDEN", message: "Only owner or admin may perform this action" });
}
