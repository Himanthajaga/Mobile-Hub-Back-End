"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
//next - is a callback function
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        res.status(401).json({
            error: "Auth token is not present in request header"
        });
        return;
    }
    //verify jwt token if it is a valid one
    jsonwebtoken_1.default.verify(token, JWT_SECRET, (error, user) => {
        if (error) {
            res.status(401).json({
                error: 'Invalid or expired token'
            });
            return;
        }
        req.user = user; // Attach user info to the request object
        next(); // Call the next middleware or route handler
    });
};
exports.authenticateToken = authenticateToken;
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        const user = req.user;
        if (!user || !roles.includes(user.role)) {
            res.status(403).json({
                error: "Access denied!   User doesn't have permission to perform this operation"
            });
            return;
        }
        next(); // Call the next middleware or route handler
    };
};
exports.authorizeRoles = authorizeRoles;
