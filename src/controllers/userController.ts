import { Request, Response, NextFunction } from "express";
import * as userService from "../services/userService";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newUser = await userService.createUser(req.body)
        res.status(201).json(newUser)
    } catch (error) {
        next(error)
    }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.findAllUsers()
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const username = req.params.username;
        const user = await userService.findUserByUsername(username);
        if (!user) {
            const error = new Error("User not found")
            error.name = "NotFoundError"
            throw error
        }
        res.status(200).json(user)        
    } catch (error) {
        next(error)
    }
};


