"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// contact.model.ts
const mongoose_1 = __importDefault(require("mongoose"));
const Contact = mongoose_1.default.model('Contact', contactSchema);
exports.default = Contact;
