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
exports.validateProduct = exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.saveProduct = exports.getAllProducts = void 0;
const product_model_1 = __importDefault(require("../model/product.model"));
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    // Logic to get all products
    // return prodctList;
    return product_model_1.default.find();
});
exports.getAllProducts = getAllProducts;
const saveProduct = (product) => __awaiter(void 0, void 0, void 0, function* () {
    // productList.push(product);
    // return product;
    return product_model_1.default.create(product);
});
exports.saveProduct = saveProduct;
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Logic to get product by ID
    return product_model_1.default.findOne({ id: id });
});
exports.getProductById = getProductById;
const updateProduct = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.default.findOneAndUpdate({ id: id }, data, { new: true });
    if (!product) {
        return null; // Product not found
    }
    // Object.assign(product, data);
    return product;
});
exports.updateProduct = updateProduct;
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // const index = Product.(product => product.id === id);
    // if (index === -1){
    //     return false;
    // }
    // productList.splice(index, 1);
    yield product_model_1.default.deleteOne({ id: id });
    return true;
});
exports.deleteProduct = deleteProduct;
const validateProduct = (product) => {
    if (!product.id || !product.name || !product.price || !product.currency || !product.image) {
        return 'All fields are required';
    }
    return null;
};
exports.validateProduct = validateProduct;
