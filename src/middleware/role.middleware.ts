import type { Request, Response, NextFunction } from "express";
import type { RoleTypes } from "../types/users.types.js";
import type { UserDocument } from "../model/users.model.js";

export const authorizedRole = (...allowedRoles: RoleTypes[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const user = (req as any).user as UserDocument | undefined;
        if (!user || !allowedRoles.includes(user.role)) {
            const err = new Error("Access Denied.");
            (err as any).status = 403;
            return next(err);
        }
        next();
    };
};
