import type { Request, Response, NextFunction } from "express";
import * as AuthService from "../services/auth.service.js";


export const _login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await AuthService.login(req.body);
        res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        next(error);
    }
};


export const _register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await AuthService.register(req.body)
        res.status(201).json({
            success: true,
            data,
        });
    } catch (error) {
        next(error);
    }
};


export const _profiles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await AuthService.profiles();
        res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        next(error);
    }
};
