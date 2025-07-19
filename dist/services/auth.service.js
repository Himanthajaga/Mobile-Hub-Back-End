"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const refreshTokens = new Set();
const adminUser = {
    id: 1,
    username: "admin",
    password: bcryptjs_1.default.hashSync("1234", 10),
    role: "admin"
};
const customerUser = {
    id: 2,
    username: "customer",
    password: bcryptjs_1.default.hashSync("1234", 10),
    role: "customer"
};
const userList = [];
userList.push(adminUser);
userList.push(customerUser);
const authenticateUser = (username, password) => {
    const existingUser = userList.find(user => user.username === username);
    let isValidPassword = undefined != existingUser
        && bcryptjs_1.default.compareSync(password, existingUser.password);
    if (!existingUser || !isValidPassword) {
        return null;
    }
    const accessToken = jsonwebtoken_1.default.sign({
        id: existingUser.id,
        username: existingUser.username,
        role: existingUser.role
    }, JWT_SECRET, { expiresIn: "5m" });
    const refreshToken = jsonwebtoken_1.default.sign({
        username: existingUser.username
    }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
    refreshTokens.add(refreshToken);
    return { accessToken, refreshToken };
};
exports.authenticateUser = authenticateUser;
