"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateContact = exports.saveContact = exports.getAllContacts = void 0;
const contact_model_1 = __importDefault(require("../model/contact.model"));
//retrieve saved contact data
const getAllContacts = () => __awaiter(void 0, void 0, void 0, function* () {
    return contact_model_1.default.find();
});
exports.getAllContacts = getAllContacts;
//save contact data
const saveContact = (contact) => __awaiter(void 0, void 0, void 0, function* () {
    return contact_model_1.default.create(contact);
});
exports.saveContact = saveContact;
const validateContact = (contact) => {
    return null;
};
exports.validateContact = validateContact;
