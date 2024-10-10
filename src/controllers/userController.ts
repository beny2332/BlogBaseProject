import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/userModel";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newUser = await User.create(req.body)
        res.status(201).json(newUser)
    } catch (error) {
        next(error)
    }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({ username: username })
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


