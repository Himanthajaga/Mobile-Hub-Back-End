import User from '../model/user.model'  //Adjust the import path as necessary
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { sendEmail } from '../utils/email.util';


dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

const refreshTokens = new Set<string>();
export const registerUser = async (username: string, password: string, role: string,email:string,image:string,status:string) => {
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            throw new Error("Username already exists");
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new User({ username, password: hashedPassword, role, email, image ,status});
        await newUser.save();
        return { message: "User registered successfully" };
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "An unknown error occurred");
    }
};
export const authenticateUser = async (username: string, password: string) => {
    try {
        // Log the authentication attempt
        console.log(
            `Authenticating user: ${username}, Password: ${password.length > 0 ? "******" : "empty"}`
        );

        // Include 'status' in the select statement
        const existingUser = await User.findOne({ username }).select("username password role email image status");

        if (!existingUser) {
            throw new Error("User not found");
        }
        // Ensure existingUser.email is defined before calling sendEmail
        if (!existingUser.email) {
            throw new Error("User email is not available");
        }

        // Log the retrieved user data
        console.log("Retrieved user data:", existingUser);

        // Check if the user's status is inactive
        if (existingUser.status === "inactive") {
            throw new Error("You cannot log in. Admin has restricted your account.");
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

        // // Send email after successful authentication
        // // Send email after successful authentication
        // await sendEmail(
        //     existingUser.email, // Now guaranteed to be a string
        //     "Login Notification",
        //     `Hi ${existingUser.username}, you have successfully logged in.`,
        //     `<p>Hi <strong>${existingUser.username}</strong>, you have successfully logged in.</p>`
        // );
        // console.log(`Login email sent to ${existingUser.email}`);
        //

        // Log the returned data
        const response = {
            accessToken,
            refreshToken,
            user: {
                id: existingUser._id,
                username: existingUser.username,
                role: existingUser.role,
                email: existingUser.email,
                image: existingUser.image,
                status: existingUser.status
            },
            message: "User authenticated successfully, please save the refresh token securely"
        };
        console.log("Authentication response:", response);

        return response;

    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "An unknown error occurred");
    }
};
export async function updateUser(
    id?:string,
    email?: string,
    username?: string,
    role?: string,
    image?: string,
    oldPassword?: string,
    newPassword?: string,
    status?: string
) {
    try {
        console.log("Role received:", role);
        // Case-insensitive email query
        const existingUser = await User.findById(id).select("username role email image password");
        if (!existingUser) {
            throw new Error("User not found");
        }

        // Check if old password is provided and matches
        if (oldPassword && newPassword) {
            const isPasswordValid = bcrypt.compareSync(oldPassword, existingUser.password);
            if (!isPasswordValid) {
                throw new Error("Old password is incorrect");
            }

            // Hash the new password
            const hashedNewPassword = bcrypt.hashSync(newPassword, 10);
            existingUser.password = hashedNewPassword;
        }

        // Update other fields if providedif (email) existingUser.email = email;
        if (email) existingUser.email = email;
        if (username) existingUser.username = username;
        if (role && (role === "admin" || role === "customer")) {
            existingUser.role = role;
        } else if (role) {
            throw new Error("Invalid role value. Role must be 'admin' or 'customer'.");
        }
        if (image) existingUser.image = image;
if (status) {
            if (status !== 'active' && status !== 'inactive') {
                throw new Error("Invalid status value. Status must be 'active' or 'inactive'.");
            }
            existingUser.status = status;
}
        // Save the updated user
        await existingUser.save();

        return {
            userId: existingUser._id,
            username: existingUser.username,
            role: existingUser.role,
            email: existingUser.email,
            image: existingUser.image,
            status: existingUser.status || 'active' // Default to 'active' if status is not set
        };
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "An unknown error occurred");
    }
}
export async function getAllUsers() {
    try {
        const users = await User.find().select("username role email image status").lean(); // Include 'status'
        return users.map(user => ({
            userId: user._id,
            username: user.username,
            role: user.role,
            email: user.email,
            image: user.image,
            status: user.status // Ensure 'status' is included
        }));
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "An unknown error occurred");
    }
}

export const updateUserStatus = async (id: string, status: string) => {
    return await User.findByIdAndUpdate(id, { status }, { new: true });

};
export async function getUserById(id: string) {
    try {
        const user = await User.findById(id).select("username role email image status").lean();
        if (!user) {
            throw new Error("User not found");
        }
        return {
            userId: user._id,
            username: user.username,
            role: user.role,
            email: user.email,
            image: user.image,
            status: user.status
        };
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "An unknown error occurred");
    }
}


