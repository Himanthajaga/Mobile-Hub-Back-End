"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProductModel = new mongoose_1.default.Schema({
    "id": {
        // NO Sql(Mongo Db)require = true, sql not null
        required: true, //like not null
        // type: String, // No Sql(Mongo Db) type is not String, sql varchar
        type: Number,
        unique: true, //unique key constraint
        index: true //for better performance
    },
    "name": {
        required: true,
        type: String
    },
    "price": {
        required: true,
        type: Number
    },
    "currency": {
        required: true,
        type: String
    },
    "image": {
        required: true,
        type: String
    }
});
const Product = mongoose_1.default.model('Product', ProductModel);
exports.default = Product;
