import User from '../model/user.model'  //Adjust the import path as necessary
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

const refreshTokens = new Set<string>();
export const registerUser = async (username: string, password: string, role: string,email:string,image:string) => {
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            throw new Error("Username already exists");
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new User({ username, password: hashedPassword, role, email, image });
        await newUser.save();
        return { message: "User registered successfully" };
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "An unknown error occurred");
    }
};
export const authenticateUser = async (username: string, password: string) => {
    try {
        //data coming from frontend
        console.log(
            `Authenticating user: ${username}, Password: ${password.length > 0 ? "******" : "empty"}`
        )
        const existingUser = await User.findOne({ username }).select("username password role email image");

        if (!existingUser) {
            throw new Error("User not found");
        }

        const isValidPassword = bcrypt.compareSync(password, existingUser.password);
        if (!isValidPassword) {
            throw new Error("Invalid password");
        }

        const accessToken = jwt.sign(
            { id: existingUser._id, username: existingUser.username, role: existingUser.role, email: existingUser.email, image: existingUser.image },
            JWT_SECRET,
            { expiresIn: "30m" }
        );

        const refreshToken = jwt.sign(
            { username: existingUser.username },
            REFRESH_TOKEN_SECRET,
            { expiresIn: "7d" }
        );
        refreshTokens.add(refreshToken);

        return {
            accessToken,
            refreshToken,
            user: {
                id: existingUser._id,
                username: existingUser.username,
                role: existingUser.role,
                email: existingUser.email,
                image: existingUser.image,
            },
        };
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "An unknown error occurred");
    }
};