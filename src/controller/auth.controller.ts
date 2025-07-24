import {Request, Response} from "express";
import * as authService from '../services/auth.service';
export const authenticateUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const authTokens = await authService.authenticateUser(username, password);

        if (!authTokens) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }

        res.status(200).json(authTokens);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
};
export const registerUser = async (req: Request, res: Response) => {
    const {username, password, role, email, image} = req.body;

    try {
        console.log("Registering user:", req.body);
        const result = await authService.registerUser(username, password, role, email, image);
        res.status(201).json(result);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({error: error.message});
        } else {
            res.status(400).json({error: "An unknown error occurred"});
        }
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { email,username, role,image,oldPassword,newPassword } = req.body;

    try {
        console.log("Request body for updateUser:", req.body);
        console.log("Updating user with email:", email);
        const updatedUser = await authService.updateUser(id,email,username,role,image,oldPassword,newPassword);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
}